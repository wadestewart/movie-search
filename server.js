var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3001)

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid) {
    res.send("Error");
    return
  }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(app.get('port'), function() {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
