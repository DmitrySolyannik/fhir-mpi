/*

 ----------------------------------------------------------------------------
 | fhir-mpi: Demonstration QEWD-Up FHIR-based MPI MicroService              |
 |                                                                          |
 | Copyright (c) 2019 M/Gateway Developments Ltd,                           |
 | Redhill, Surrey UK.                                                      |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                               |
 |                                                                          |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

  12 March 2019

*/
const request = require('request');
const api = require('/opt/qewd/mapped/configuration/api.json');
module.exports = function(args, finished) {
  
  const identifier = args.req.query.identifier;
  if (!identifier) {
    finished({
      error: "Please provide identifier"
    })
  }

  const options = {
    url: `${api.fhirUrl}/fhir/stu3/Patient?identifier=${identifier}`,
    method: 'GET',
    json: true
  };

  request(options, function(err, response, body) {
    if (err) {
      return finished(err);
    }
    finished(body);
  });
};
