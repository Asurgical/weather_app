const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const query=req.body.cityName;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=9f7ee97c89df1adf790ca509c4484856&units=metric";
   https.get(url,function(response){
       response.on("data",function(data){
           const datapath=JSON.parse(data);
           const temp = datapath.main.temp;
           const condition = datapath.weather[0].description;
           const icon = datapath.weather[0].icon;
           const imageUrl ="http://openweathermap.org/img/wn/" + icon + "@2x.png";

           res.write("<h1>the weather in "+query+" is "+temp+ " degree celcius</h1>");
           res.write("<p>the weather condition is"+condition+"</p>");
           res.write("<img src="+imageUrl+">");
           res.send();

       });
   });
});
app.listen(4000,function(req,res){
    console.log("the port started at 4000");
})