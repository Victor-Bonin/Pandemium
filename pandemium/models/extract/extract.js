var textract = require('textract');
var fs = require('fs');

exports.extractContent = function(query, jsonAsString) {
  var queryResultJsonObj = JSON.parse(jsonAsString);
  var dir = './cache/'+query;
  if(!fs.existsSync(dir))
  {
    fs.mkdirSync(dir);
  }
  for(var i = 0 ; i < queryResultJsonObj.items.length ; i++) {
      var url = queryResultJsonObj.items[i].link;
      extractUrl(url, dir, i);
  }
}

function extractUrl(url, dir, index) {
  console.log(url);
  textract.fromUrl(url, function(error, text) {
    fs.appendFile(dir+'/content'+index, text, function (err) {
      if (err) throw err;
    });
  });
}

function addhttp(url) {
   if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
   }
   return url;
}
