//  Copyright 2017 Xingchen Hong
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

import {
  before,
  after,
  beforeEach,
  afterEach,
  describe,
  it
} from "meteor/practicalmeteor:mocha";
import {
  expect
} from "meteor/practicalmeteor:chai";

describe('zodiase:build-json', () => {

  it('should support importing json files.', () => {

    import data from "./test-data.json";

    expect(data).to.not.be.undefined;
    expect(data).to.be.an('object');
    expect(data.number).to.be.a('number');
    expect(data.boolean).to.be.a('boolean');
    expect(data.string).to.be.a('string');
    expect(data.object).to.be.an('object');
    expect(data.object.secret).to.equal('foobar');
    expect(data.array).to.be.an('array');

  });

});
