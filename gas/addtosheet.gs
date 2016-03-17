/*
 Copyright 2011 Martin Hawksey
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var SHEET_NAME = "Sheet1";
var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service

function doPost(e){
    return handleResponse(e);
}

// for testing only
function doGet(){
    return testPost();
}

function testPost() {
    var e = {};
    e.parameter = { name: 'Test Post', weeks: 123, note: 'Test post by test function' };
    return handleResponse(e);
}


function handleResponse(e) {

    var lock = LockService.getPublicLock();
    lock.waitLock(30000);  // wait 30 seconds before conceding defeat.

    try {
        var docId = SCRIPT_PROP.getProperty("key");
        if (docId === "" || !docId) {
            return ContentService
                .createTextOutput("No document ID defined, have you ran the setup() function of the GAS script?")
                .setMimeType(ContentService.MimeType.JAVASCRIPT); }
        var doc = SpreadsheetApp.openById(docId);
        var sheet = doc.getSheetByName(SHEET_NAME);

        // we'll assume header is in row 1 but you can override with header_row in GET/POST data
        var headRow = e.parameter.header_row || 1;
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nextRow = sheet.getLastRow()+1; // get next row
        var row = [];
        // loop through the header columns
        for (i in headers){
            if (headers[i] == "Timestamp"){ // special case if you include a 'Timestamp' column
                row.push(new Date());
            } else { // else use header name to get data
                row.push(e.parameter[headers[i]]);
            }
        }
        // more efficient to set values as [][] array than individually
        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
        return ContentService
            .createTextOutput(JSON.stringify({"result":"success", "row": nextRow, "spam": e.parameter["spam"]}))
            .setMimeType(ContentService.MimeType.JSON);
    } catch(e){
        // if error return this
        Logger.log("failed");
        Logger.log(e);
        return ContentService
              .createTextOutput(JSON.stringify({"result":"error", "error": e}))
              .setMimeType(ContentService.MimeType.JSON);

    } finally { //release lock
        lock.releaseLock();
    }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}
