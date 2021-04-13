const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const csvWriter = createCsvWriter({
  path: 'Report.csv',
  header: [
    {id: 'User', title: 'User'},
    {id: 'TransactionID', title: 'TransactionID'},
    {id: 'Product', title: 'Product'},
  ]
});


var rows = [];
fs.readFile('./transaction.db', 'utf8', (err, data)=>{
  rows = data;

  // csvWriter
  // .writeRecords(rows)
  // .then(()=> console.log('The CSV file was written successfully'));
})



