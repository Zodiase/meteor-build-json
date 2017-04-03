Plugin.registerCompiler({
  extensions: ['json'],
  archMatching: 'web'
}, () => new JsonCompiler());

// CompileResult is {js, sourceMap}.
class JsonCompiler extends CachingCompiler {
  constructor() {
    super({
      compilerName: 'json',
      defaultCacheSize: 1024*1024*10,
    });
  }

  getCacheKey(inputFile) {
    return inputFile.getSourceHash();
  }

  compileResultSize(compileResult) {
    return compileResult.js.length +
      this.sourceMapSize(compileResult.sourceMap);
  }

  compileOneFile(inputFile) {
    const fileSrc = inputFile.getContentsAsString();

    // Test if file is JSON-parsable.
    let jsonStr = '';
    try {
      const jsonDoc = JSON.parse(fileSrc);
      jsonStr = JSON.stringify(jsonDoc, null, 2);
    } catch (error) {
      inputFile.error({
        message: error.message,
        sourcePath: decodeFilePath(error.filename),
        line: error.line,
        column: error.column
      });
      return null;
    }

    const JavaScript = `module.exports = ${jsonStr};`;

    const compileResult = {js: JavaScript, sourceMap: ''};

    return compileResult;
  }

  addCompileResult(inputFile, compileResult) {
    inputFile.addJavaScript({
      data: compileResult.js,
      path: inputFile.getPathInPackage() + '.js',
      sourceMap: compileResult.sourceMap
    });
  }
}

function decodeFilePath (filePath) {
  const match = filePath.match(/^{(.*)}\/(.*)$/);
  if (! match)
    throw new Error('Failed to decode JSON path: ' + filePath);

  if (match[1] === '') {
    // app
    return match[2];
  }

  return 'packages/' + match[1] + '/' + match[2];
}
