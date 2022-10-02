const express = require("express");
const bodyParser = require("body-parser");
const prompt = require("prompt");
const _ = require("lodash");
const ejs = require("ejs");
var fs = require('fs');



var Url = [];
var protocol = [];
var hostname = [];
var subdomain = []; //third level domain
var secondLevelDomain = [];
var topLevelDomain = [];
var directory = [];
var file = [];
var numberOfSubdomains=1;
var score = 0;
var thirdLevelDomainsArray = [];
//prompt.start();
// console.log("enter the url!");
// prompt.get(["url"],function(err,res){
//     console.log("the url you entered is :" + res.url);
//     enteredUrl.push(req.res);
// })   
// alert(url);

const app = express();
app.set("view engine","ejs");

// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var text = fs.readFileSync("tld.txt", 'utf-8');
var textByLine = text.toString().split('\n');
console.log(textByLine);

var numbers = ['0','1','2','3','4','5','6','7','8','9'];
//var input = "www.hoohle234.com"
function digital_count(input) {

      var digital_count = 0;
      for (let i = 0; i < input.length; i++) {
            if (input[i] != null && input[i] in numbers) {
                  digital_count++;          
            }     
      }
      return digital_count;
}

function digital_length(input){
      var alphanumeric_count = 0;
      for (let i = 0; i < input.length; i++) {
            if (input[i] != null) {
                  alphanumeric_count++;          
            }     
      }
      return alphanumeric_count;
}

function isLegit(data,tld,sld,thirdd){
    var i=0;
    
    if(data.includes(_.upperCase(tld))){
        score=score+ 15;
    }
    console.log(_.upperCase(tld));
    if(data.includes(_.upperCase(sld))){
        score=score+ 10;
    }
    console.log(_.upperCase(sld));

    for(var i=0;i<thirdd.length;i++){
        if(data.includes(_.upperCase(thirdd[i]))){
            score=score+ 5;
        }
    }
    
}





app.get("/",function(req,res){
    res.render("home",{
        enteredUrl:Url,
        protocol:protocol.join(''),
        subdomain:subdomain.join(''),
        secondLevelDomain:secondLevelDomain.join(''),
        topLevelDomain:topLevelDomain.join(''),
        hostname:hostname.join(''),
        directory:directory.join(''),
        file:file.join(''),
    }
    )   
});



app.post("/",function(req,res){
    
    console.log(textByLine);
    var i=0;
    var initialUrl = req.body.enteredUrl;
    var temp = "/";
    var url = initialUrl.concat(temp);
    Url.push(url);
    console.log(url.length);
    while(url[i]!=':'){
        protocol.push(url[i]);
        i++;
    }
    i = i + 3;
    while(url[i]!=="/"){
        hostname.push(url[i]);
        i++;
    }
    console.log(i);
    var keepHostname = i;
    var hostNameLength = hostname.length;
    console.log(hostNameLength);
    
    while(hostname[hostNameLength]!='.'){
        topLevelDomain.push(hostname[hostNameLength]);
        hostNameLength--;
    }
    topLevelDomain=topLevelDomain.reverse();
    console.log(topLevelDomain);
    console.log(hostNameLength);
    hostNameLength--;
    while(hostname[hostNameLength]!='.'){
        secondLevelDomain.push(hostname[hostNameLength]);
        hostNameLength--;
    }
    secondLevelDomain=secondLevelDomain.reverse();
    console.log(secondLevelDomain);
    console.log(hostNameLength);
    hostNameLength--;
    while(hostNameLength!=-1){
        subdomain.push(hostname[hostNameLength]);
        hostNameLength--;
    }
    subdomain = subdomain.reverse();
    console.log(subdomain);
    for(var s = 0;s<subdomain.length;s++){
        if(subdomain[s]=='.'){
            numberOfSubdomains++;
        }
    }
    var combinedSubdomain = subdomain.join('');
    console.log(combinedSubdomain);
    // for(var i = 0;i<combinedSubdomain.length;i++){
    //     var temp='';
    //     if(combinedSubdomain[i]!='.'){
    //         temp = temp + combinedSubdomain[i];
    //     }
        
    //     thirdLevelDomainsArray.push(temp);
    // }
    
    
    thirdLevelDomainsArray = combinedSubdomain.split('.');
    console.log(thirdLevelDomainsArray);
    console.log(hostNameLength);

    
    console.log(url.length);
    console.log(keepHostname);
    i++;
    console.log(i);
    if(i!=url.length){
        i = url.length-1;
        i--;
        console.log(url[i]);
        
        
        while(url[i]!="/"){
            console.log("pushed "+url[i]);
            file.push(url[i]);
            i--;
        }
        file = file.reverse();
        i--;
        console.log(file.join(''));
        console.log(url[i]);
        console.log(i);
    }
    while(i>=keepHostname){
        while(url[i]!="/"){
            console.log("pushed " + url[i]);
            directory.push(url[i]);
            i--;
        }
        directory.push("/");
        console.log(i);
        console.log(keepHostname);
        i--;
    }
    directory = directory.reverse();
    console.log(directory);
    i--;

        
    

    console.log(Url);
    console.log(protocol.join(''));
    console.log(subdomain.join(''));
    console.log(secondLevelDomain.join(''));
    console.log(topLevelDomain.join(''));
    console.log(directory.join(''));
    console.log(file.join(''));
    console.log("subdomains: "+numberOfSubdomains);
    console.log(digital_count(url));
    console.log(digital_length(url));
    if(digital_length(hostname)<30){
        score += 7;
    }
    else if((digital_length(hostname)>=30) && (digital_length(hostname)<40)){
        score += 5;
    }
    else if((digital_length(hostname)>=40) && (digital_length(hostname)<60)){
        score += 2;
    }
    else if((digital_length(hostname)>=60) && (digital_length(hostname)<70)){
        score += 1;
    }
    else if((digital_length(hostname)>=70) && (digital_length(hostname)<80)){
        score += 2;
    }
    else{
        score += 7;
    }

    if(digital_count(hostname)<5){
        score += 5;
    }
    if(digital_count(hostname)>=5 &&digital_count(hostname)<15){
        score += 3;
    }
    else{
        score += 1;
    }

    if(numberOfSubdomains==2){
        score -= 3;
    }
    else if(numberOfSubdomains>=3){
        score -= 7;
    };

    isLegit(textByLine,topLevelDomain.join(''),secondLevelDomain.join(''),thirdLevelDomainsArray);
    console.log(score);
    
    if(score<=25){
        console.log("You are being phished! Dont click that link!");
    }
    else if(score>25 && score<30){
        console.log("You are at a moderate risk of being phished!");
    }
    else{
        console.log("The link is safe...");
    }

    res.redirect('/');
})

console.log(score);
app.get("/result",function(req,res){
    
    res.render("result",{
        score:score,
    });

})

app.listen(3000,function(){
    // console.log("Server started on port 3000");
})


