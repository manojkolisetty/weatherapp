const express = require('express');
const bodyparser = require('body-parser');

const app = express();


app.use(bodyparser.urlencoded({extended: true}));

const https = require("https");
const { Console } = require('console');

app.get("/",function(req,res){

    res.sendFile( __dirname +"/index.html");

    
})

app.post("/",function(req, res){
    //    console.log(req.body.Cityname);

   const query = req.body.Cityname;
   const apikey = "74dfb052107ca9f01c24e8c1fb4bf6f4";
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query + "&appid=" +apikey  ;

   https.get(url, function (resp){
           console.log(resp.statuscode);
    
            resp.on("data",function(data){
                const weatherdata = JSON.parse(data);
                
                const temp = weatherdata.main.temp;
                const weatherdecription = weatherdata.weather[0].description;
                // const icon = weatherdata.weather[0].id;
                var res = (temp-273.15);
    
                console.log(res);
                res.write("<h1> the weather is   " + weatherdecription + "! . </h1>");
                res.write("<p> the temp in" + query + " is " + res + " celcius <p>");
                
                // res. write(icon);
                res.send();
            })
       })
    

});


//
app.listen(process.env.PORT ||3000,function(req,res){
    console.log('server runin on port 3000');
})