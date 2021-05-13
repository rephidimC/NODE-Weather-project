//jshint esversion:6
const express= require("express");
const app = express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  // var place = req.body.place;
  // var url= "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=667b4d464a32f369fb34666550418dde#";
  // https.get(url, function(response) {
  //   // console.log(response.statusCode);
  //   response.on("data", function(data) {
  //     const weatherData = JSON.parse(data);
      //JSON is added to convert the raw hexadecimal codes to json format.
      // console.log(weatherData);
      // const object = {
      //   Name: "Victor",
      //   Gender: "Male",
      // };
      // console.log(JSON.stringify(object));

      //
      // const weatherDescription = weatherData.weather[0].description;
      // console.log(weatherDescription);
      // const weatherTemp= weatherData.main.temp;
      // console.log(weatherTemp);
        // res.send("<h1>The weather in Ilorin right now looks " + weatherDescription + ".</h1>");
      //assuming I want to pass two stuffs with res.send, it would be impossible as i can only have one.
      //but res.write can be used easily, then res. send afterwards.
      //Like here.

      // res.write("<h1>The weather in Ilorin right now looks " + weatherDescription + ".</h1>");

  //   });
  // });
});


app.post("/", function(req, res) {
var place = req.body.place;
var url= "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=667b4d464a32f369fb34666550418dde&units=metric";
https.get(url, function(response) {
response.on("data", function(data) {
const weatherData = JSON.parse(data);
const weatherTemp= weatherData.main.temp;
res.write("<h1>The weather in " + place + " right now is " + weatherTemp + " degree Celcius</h1>");
const weatherIcon = weatherData.weather[0].icon;
const iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
res.write("<img src="+ iconURL +">");
res.send();
});
});
//
//   const weatherTemp= weatherData.main.temp;
// console.log("post request received");
  // res.send(weatherTemp);
});

app.listen(3000, function(res, req) {
  console.log("Server is on port 3000");
});
