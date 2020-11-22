const Person = require('../../model/Person');
const fastCsv = require('fast-csv');
const csv = require('csv-parser');
const fs = require('fs');


const _historyCsvPath = `./project/helper/global/History.csv`;
let personInfo;

async function getPatientInfo() {
    console.log('personInfo', personInfo);
    if (!personInfo) {
        personInfo = new Person();
    } 
    return personInfo;
}

async function saveCsvHistory(person) {
    fastCsv.writeToStream(fs.createWriteStream(_historyCsvPath, { flags: 'a' }), [{ ...person }], { headers: false, includeEndRowDelimiter: true })
    // tslint:disable-next-line: no-console
    .on('finish', () => console.log('file written successfully'));
}

async function readPersonFromCsv() {
    const results = [];
    return new Promise(function(resolve, reject) {
        fs.createReadStream(_historyCsvPath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log('results', results[1]);
            resolve(results[1]);
        });
    });
    
}

exports.getPatientInfo = getPatientInfo;
exports.saveCsvhistory = saveCsvHistory;
exports.readPersonFromCsv = readPersonFromCsv;