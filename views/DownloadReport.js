//get Database_Sheet from server
async function downloadAsExcel() {
    let response = await fetch(window.location.pathname.replace('#', ''), { method: 'POST', headers: { 'Content-Type': 'application/json' } })
    let data = await response.json();
    //console.log(data)
    return data;
}
downloadAsExcel()
    .then((data) => { if (data.status == 401) { window.location.href = '/error401' } else { return data } }).then((data) => {
        // console.log(JSON.parse(JSON.stringify(data)));
        if (data[0] != undefined) {
            const db = window.location.pathname.replace('/admin/report/', "").replace('#', '').toLowerCase();
            Database_Sheet = data;
            //arrange Database_Sheet
            if (db == 'transaction' || db == 'basket')
                for (i = 0; i < Database_Sheet.length; i++) {
                    ExtractChildren(Database_Sheet[i], 'Product');
                    ExtractChildren(Database_Sheet[i], 'Time');
                    ExtractChildren(Database_Sheet[i], 'Basket_Confirm_Time');
                    delete Database_Sheet[i].Time;
                    delete Database_Sheet[i].Basket_Confirm_Time;
                    delete Database_Sheet[i].Basket_Confirm_Time__Date;
                    delete Database_Sheet[i].Basket_Confirm_Time__Day;
                    delete Database_Sheet[i].Basket_Confirm_Time__Month;
                    delete Database_Sheet[i].Basket_Confirm_Time__Year;
                    delete Database_Sheet[i].Basket_Confirm_Time__Hour;
                    delete Database_Sheet[i].Basket_Confirm_Time__Minute;
                    delete Database_Sheet[i].Basket_Confirm_Time__Pending;
                    delete Database_Sheet[i].Product;
                    delete Database_Sheet[i]._id;
                    delete Database_Sheet[i].TransactionID;
                    delete Database_Sheet[i].User;
                    delete Database_Sheet[i].BasketID;
                    delete Database_Sheet[i].Time__TimeStamp;
                    delete Database_Sheet[i].Product__ProductID;
                    
                }
            if (db == 'stockchanges')
                for (i = 0; i < Database_Sheet.length; i++) {
                    // delete Database_Sheet[i]._id;
                    Database_Sheet[i].Date = `${Database_Sheet[i].Date}/${Database_Sheet[i].Month}/${Database_Sheet[i].Year}`;
                    delete Database_Sheet[i].Day;
                    delete Database_Sheet[i].Month;
                    delete Database_Sheet[i].Year;
                    delete Database_Sheet[i].Minute;
                    delete Database_Sheet[i].Hour;
                    // ExtractChildren(Database_Sheet[i], 'Basket_Confirm_Time');
                    // delete Database_Sheet[i].Basket_Confirm_Time;
                    // Database_Sheet.
                }
            if (db == 'stock') {

                // setTimeout(() => {
                let times = Database_Sheet.length.toString();
                for (i = 0; i < parseInt(times); i++) {
                    // if (Database_Sheet[i].Filter != 'None') {
                    if (Database_Sheet[i].Filter == 'SML') {
                        const sizes = ['S', 'M', "L", "XL", "XXL", 'XXXXL'];
                        const genders = ['Male', 'Female'];
                        console.log('SML');
                        for (j = 0; j < 12; j++) {
                            const NewSheetNo = parseInt(Database_Sheet.length.toString());
                            Database_Sheet[NewSheetNo] = {};
                            Database_Sheet[NewSheetNo].Name = `${Database_Sheet[i].Name}-${genders[Math.floor(j / 6)]}-${sizes[j % 6]}`;
                            Database_Sheet[NewSheetNo].Quantity = Database_Sheet[i][genders[Math.floor(j / 6)]][sizes[j % 6]];
                            Database_Sheet[NewSheetNo].Price = Database_Sheet[i].Price;
                            // console.log(Database_Sheet[i][gender][size] + `-${Database_Sheet[i].Name}-${gender}-${size}`);

                            console.log((j % 6) + "  " + Math.floor(j / 6));//this is an example of a good equation. this short one can handle use 1 loop instead of two loops. Think about it

                            // console.log(Database_Sheet[NewSheetNo]);
                        }
                        /*
                        genders.forEach(gender => {
                            sizes.forEach(size => {

                            });
                        });
                        */
                    }
                    if (Database_Sheet[i].Filter == 'Numbers') {
                        if (Database_Sheet[i].Gender != 'Others') {
                            if (Database_Sheet[i][Database_Sheet[i].Gender] != undefined) {
                                let temp = Database_Sheet[i][Database_Sheet[i].Gender].Sizes;
                                for (j = temp[0]; j < parseInt(temp[0]) + temp.length; j++) {
                                    const NewSheetNo = parseInt(Database_Sheet.length.toString());
                                    console.log(NewSheetNo + " " + j)
                                    Database_Sheet[NewSheetNo] = {};
                                    Database_Sheet[NewSheetNo] = JSON.parse(JSON.stringify(Database_Sheet[i]));
                                    // console.log(JSON.stringify(Database_Sheet[NewSheetNo]) + j);
                                    Database_Sheet[NewSheetNo].Name = `${Database_Sheet[i].Name} ${Database_Sheet[i].Gender} ${j}`;
                                    // console.log(Database_Sheet[NewSheetNo]);
                                    Database_Sheet[NewSheetNo].Quantity = (Database_Sheet[NewSheetNo][Database_Sheet[i].Gender].Quantity[Database_Sheet[NewSheetNo][Database_Sheet[i].Gender].Sizes.indexOf(j)])
                                    Database_Sheet[NewSheetNo].Female = "";
                                    Database_Sheet[NewSheetNo].Male = "";
                                    delete Database_Sheet[NewSheetNo].Female;
                                    delete Database_Sheet[NewSheetNo].Male;
                                }
                            }
                        } else {
                            if (Database_Sheet[i].Female != undefined && Database_Sheet[i].Male != undefined) {
                                let temp = Database_Sheet[i].Female.Sizes || Database_Sheet[i].Male.Sizes;
                                for (j = temp[0]; j < parseInt(temp[0]) + temp.length; j++) {
                                    const NewSheetNo = parseInt(Database_Sheet.length.toString());
                                    // console.log(NewSheetNo + " " + j)
                                    Database_Sheet[NewSheetNo] = {};
                                    Database_Sheet[NewSheetNo] = JSON.parse(JSON.stringify(Database_Sheet[i]));
                                    Database_Sheet[NewSheetNo + 1] = {};
                                    Database_Sheet[NewSheetNo + 1] = JSON.parse(JSON.stringify(Database_Sheet[i]));
                                    // //console.log(JSON.stringify(Database_Sheet[NewSheetNo]) + j);
                                    Database_Sheet[NewSheetNo].Name = `${Database_Sheet[i].Name} Male ${j}`;
                                    Database_Sheet[NewSheetNo + 1].Name = `${Database_Sheet[i].Name} Female ${j}`;
                                    // //console.log(Database_Sheet[NewSheetNo]);
                                    Database_Sheet[NewSheetNo].Quantity = (Database_Sheet[NewSheetNo].Male.Quantity[Database_Sheet[NewSheetNo].Male.Sizes.indexOf(j)])
                                    Database_Sheet[NewSheetNo + 1].Quantity = (Database_Sheet[NewSheetNo].Female.Quantity[Database_Sheet[NewSheetNo].Female.Sizes.indexOf(j)])
                                    Database_Sheet[NewSheetNo].Female = "";
                                    Database_Sheet[NewSheetNo].Male = "";
                                    Database_Sheet[NewSheetNo + 1].Female = "";
                                    Database_Sheet[NewSheetNo + 1].Male = "";
                                    delete Database_Sheet[NewSheetNo].Female;
                                    delete Database_Sheet[NewSheetNo].Male;
                                    delete Database_Sheet[NewSheetNo + 1].Female;
                                    delete Database_Sheet[NewSheetNo + 1].Male;
                                }
                            }
                        }
                    }
                    // }
                }
                // //console.log(times)
                //console.log(Database_Sheet)
                for (i = 0; i < Database_Sheet.length; i++) {
                    if (Database_Sheet[i].Quantity == undefined || Database_Sheet[i].Quantity == null || Database_Sheet[i].Quantity == "" && Database_Sheet[i].Quantity != 0) {
                        // Database_Sheet.splice(i, 1);
                        console.log(Database_Sheet[i].Quantity)
                        Database_Sheet[i].Name = "";
                    }
                }

            }
            for (i = 0; i < Database_Sheet.length; i++) {
                //console.log(JSON.stringify(Database_Sheet[i]))
                delete Database_Sheet[i].Picture;
                delete Database_Sheet[i].Picture2;
                delete Database_Sheet[i].Content1;
                delete Database_Sheet[i].Thumb;
                delete Database_Sheet[i].Thumb1;
                delete Database_Sheet[i].Thumb2;
                delete Database_Sheet[i].Content2;
                delete Database_Sheet[i].Filter;
                delete Database_Sheet[i]._id;
                delete Database_Sheet[i].StockingID;
                delete Database_Sheet[i].IP;
                delete Database_Sheet[i].Time;
                delete Database_Sheet[i].ProductID;
                delete Database_Sheet[i].Confirmed;
                delete Database_Sheet[i].Female;
                delete Database_Sheet[i].Male;
                delete Database_Sheet[i].Gender;
            }
            // }, 200);

            Database_Sheet.forEach(row => {
                if (row.Name == "")
                    Database_Sheet.splice(Database_Sheet.indexOf(row), 1)
            });
            const worksheet = XLSX.utils.json_to_sheet(Database_Sheet);
            const workbook = {
                Sheets: {
                    'Database_Sheet': worksheet
                },
                SheetNames: ['Database_Sheet']
            };
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            // //console.log(excelBuffer);
            saveAsExcel(excelBuffer, window.location.pathname.replace('/admin/report/', "").replace('#', '').toLowerCase() + ' Report ' + new Date().getTime() + '.xlsx');

            // delete Database_Sheet._id;
            function ExtractChildren(source, fieldName) {
                var fields = [];
                for (var k in source[fieldName]) {
                    fields.push(k);
                }
                // //console.log(fields);
                fields.forEach(names => {
                    source[fieldName + '__' + names] = source[fieldName][names];
                });
                // delete Database_Sheet[i][fieldName]
            }

            document.getElementById('json').innerHTML = JSON.stringify(Database_Sheet, undefined, 4);
            for (i = 0; i < data.length; i++) {
                var fields = [];
                for (var k in data[i]) {
                    fields.push(k);
                    // document.body.innerText += k + '\n';
                }
                // //console.log(fields);
            }
            // //console.log(toUniqueArray(fields));
            toUniqueArray(fields).forEach(j => {
                document.getElementById('temp').innerText += j + '\n';
            });
            // downloadAsExcel();
        }
        else
            document.body.innerHTML += "Nothing to download right now. All Database_Sheet cleared. No Database_Sheet currently";
    });



function saveAsExcel(buffer, filename) {
    const Database_Sheet = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(Database_Sheet, filename);
    // saveAs(Database_Sheet, filename + EXCEL_EXTENSION);
}

var Database_Sheet = [{
    "Segment": "Government",
    "Country": "Canada",
    "Product": "Carretera",
    "Discount": "None",
},
{
    "Segment": "Government",
    "Country": "Germany",
    "Product": "Carretera",
    "Discount": "None",
},
{
    "Segment": "Midmarket",
    "Country": "France",
    "Product": "Carretera",
    "Discount": "None",
}];
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';
//console.log(window.XLSX);
function toUniqueArray(a) {
    var newArr = [];
    for (var i = 0; i < a.length; i++) {
        if (newArr.indexOf(a[i]) === -1) {
            newArr.push(a[i]);
        }
    }
    return newArr;
}
