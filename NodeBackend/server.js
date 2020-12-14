var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}));

const fs = require('fs');
let rawdata = fs.readFileSync('../frontend-new/date_impexcera/dateDB.json');
let remains = JSON.parse(rawdata);
var imge = '../frontend-new/date_impexcera/';

console.log("Server started and data recieved!");
app.get('/portfolio', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("REQUEST PORTFOLIO!");
  if(req.query.id < remains['colectii'].length) {
    res.json(remains['colectii'][req.query.id]);
  }
  else {
    res.json({"Error": "No such collection"});
  }
});

function filterBy(data, filterParam, filterData) {
  if(filterData === undefined || filterData == 'all') {
    return data;
  }
  return data.filter(function(item) {
    return item[filterParam] == filterData;
  });
}

function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function pruneBy(buffer, elements) {
  var elm = [];
  for(var i = 0; i < buffer.length; i++) {
    if(buffer[i][elements] !== null) {
      elm.push(buffer[i]);
    }
  }
  return elm;
}

app.get('/portfolio_all', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  var data = filterBy(remains['colectii'], 'tip', req.query.tip);
  data = filterBy(data, 'colectie', req.query.colectie);
  var page = req.query.page;
  var per_page = req.query.per_page;
  var pagesNumber = Math.floor(data.length / per_page) + (data.length % per_page !== 0);
  let pagination = paginate(data, per_page, page);
  res.json({"data": pagination, "pages": pagesNumber});
});

app.get('/image', function(req, res){
  if(req.query.name != undefined) {
    fs.readFile(imge + req.query.name, 'utf8', function (err, data) {
      if(err) {
        res.json({"Error": "No such image with name " + req.query.name + " exists!"});
      }
      else if(data) {
        res.writeHead(200, {'Content-type': 'image/jpg'});
        res.end(data);
      }
    });
  }
  else {
    res.json({"Error": "Name has not been provided!"});
  }
});

app.get('/colectii', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  var colectionDict = {};
  var colections = [];
  for(var i = 0; i < remains['colectii'].length; i++) {
    if(remains['colectii'] && !colectionDict[remains['colectii'][i]['colectie']]) {
      if(colectionDict[remains['colectii'][i]['colectie']] === undefined) {
        colectionDict[remains['colectii'][i]['colectie']] = 1;
      }
      else {
        colectionDict[remains['colectii'][i]['colectie']]++;
      }
    }
  }
  for (var key in colectionDict) {
    colections.push([key, colectionDict[key]]);
  }
  res.json({"colectii": colections})
});

app.get('/tips', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  var colectionDict = {};
  var colections = [];
  colections.push(['all', remains['colectii'].length])
  for(var i = 0; i < remains['colectii'].length; i++) {
    if(remains['colectii']) {
      var response = remains['colectii'][i]['tip'].replace(/\s/g, '');
      if(!colectionDict[response]) {
        colectionDict[response] = 1;
      }
      else {
        colectionDict[response]++;
      }
    }
  }
  for (var key in colectionDict) {
    colections.push([key, colectionDict[key]]);
  }
  res.json({"tips": colections})
});

app.get('/elements', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("REQUEST ELEMENTS!");
  elements = [];
  var page = req.query.page;
  var per_page = req.query.per_page;
  for(var i = 0; i < remains['colectii'].length; i++) {
    if(remains['colectii'][i]['elemente'] !== undefined) {
      elements = elements.concat(pruneBy(remains['colectii'][i]['elemente'], 'img'));
    }
  }
  var pagesNumber = Math.floor(elements.length / per_page) + (elements.length % per_page !== 0);
  let pagination = paginate(elements, per_page, page);
  res.json({"elements": pagination, "pages": pagesNumber});
});

app.listen(3000);