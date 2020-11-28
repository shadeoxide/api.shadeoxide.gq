const express = require('express');
const app = express();
const dog = require('./dog')

app.use(express.static('public'));

app.get('/api/dogimage', function(req, res){
  res.status(200).json({
        dogimage: `${dog()}`
    });
});
const fetch = require('node-fetch')

app.get('/api/chatbot', function(req, res){
  let user = req.query.user || "AUTHOR"  
  let gender = req.query.gender || "male"
    fetch(`http://api.brainshop.ai/get?bid=68974&key=QRfrQyn8sbc9Y2za&uid=${user}&msg=${encodeURIComponent(req.query.message)}`)
    .then(res => res.json())
    .then(data => {
        let name = req.query.name || "Chatbot"
        res.status(200).json({
        message: data.cnt.replace("Chatbot", name).replace('Acobot Team', 'Shade').replace('Male chatbot', `${gender} chatbot`)
    });
    });
});

app.get(`/api/base64`, function(req, res){
res.status(200).json({
  message: "use /encode or /decode"
})
})

app.get(`/api/base64/encode`, function(req, res){
if (req.query.q) {
res.status(200).json({
  response: Buffer.from(req.query.q).toString('base64')
})
}
if (!req.query.q){
res.status(200).json({
     response: "Please provide some text to encode"
})
 
}
})

app.get(`/api/base64/decode`, function(req, res){
if (req.query.q) {
res.status(200).json({
  response: Buffer.from(req.query.q, "base64").toString()
})
}
if (!req.query.q){
res.status(200).json({
     response: "Please provide some text to decode"
})
 
}
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/light', function(request, response) {
  response.sendFile(__dirname + '/views/index_light.html');
});

app.get('/documentation', function(request, response) {
  response.sendFile(__dirname + '/views/documentation.html');
});


app.get(`*`, function(req, res) {
  res.sendFile(__dirname + '/views/404.html')
})

module.exports = app;
