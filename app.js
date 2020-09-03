const express = require('express');
const bodyparser = require('body-parser');

const app = express();


app.use(bodyparser.urlencoded({extended: true}));

const https = require("https");
const { Console } = require('console');
const { url } = require('inspector');

app.get("/",function(req,res){

    res.sendFile( __dirname +"/index.html");

    
})

app.post("/",function(req, res){
    //    console.log(req.body.Cityname);

   const query = req.body.Cityname;
   const uni = req.body.units;
   const apikey = "74dfb052107ca9f01c24e8c1fb4bf6f4";
    if (uni == "celcius") {
        var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=74dfb052107ca9f01c24e8c1fb4bf6f4";
    } else if (uni == "fahrenheit"){
        var url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&units=imperial&appid=74dfb052107ca9f01c24e8c1fb4bf6f4"  ;  
    }
    else if (uni == "kelvin"){
        var url = "https://api.openweathermap.org/data/2.5/weather?q="+query + "&appid=" +apikey  ;
    }
//    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query + "&appid=" +apikey  ;
    //   var link = url;
   https.get(url, function (resp){

           console.log(resp.statusCode);
           if(resp.statusCode!==200)
           {
            res.sendFile(__dirname + "/failure.html");
           }
           
           else{

           
            resp.on("data",function(data){
                const weatherdata = JSON.parse(data);
                
                const tempe = weatherdata.main.temp;
                const weatherdecription = weatherdata.weather[0].description;
                const icon = weatherdata.weather[0].icon;
                // var resu = (tempe-273.15);
    
                console.log(icon);
                res.write("<h1> The weather is   " + weatherdecription + "! . </h1>");
                res.write("<p> The temp in " + query + " is " + tempe +" " + uni+ "<p>");
                res.write("<img src=  http://openweathermap.org/img/wn/"+icon+"@2x.png>")
                // res. write(icon);
                res.send();
            })
          } 
       })
    

});
// redirecting tp main pagr from fapure on clicking try again
 app.post("/failure",function(read,res){

    res.redirect("/")
 })


//
app.listen(process.env.PORT ||3000,function(req,res){
    console.log('server runin on port 3000');
})