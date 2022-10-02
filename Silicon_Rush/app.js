const fs = require("fs");
const readline = require("readline");
var csv = require('jquery-csv');
const stream = fs.createReadStream("tld1.csv");
const reader = readline.createInterface({ input: stream });
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
let data = [];

var array = fs.readFileSync('tld1.txt').toString().split("\n");


var input = "google.ZW";
var sl = input.split(".");
 for(i in array) {
  var m = sl[1].toUpperCase().concat('\r'); // not sure why but there is \r after all entries in the array list that we took from the file soneed to concat
  var n = array[i].toUpperCase();
  if(m == n){
    console.log("Valid");
    break;
  }

}
// console.log(data[0][0]);
// var a = data.split(",");
// console.log(a);

// console.log(data[1]);
// var tld = [];
// for(var i = 0 ; i<data.length; i++){
//   tld[i] = data[i][1];
// }
// console.log(tld);
