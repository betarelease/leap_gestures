var express = require('express'),
    app = express();

app.get('/', function(req, res){
  res.sendfile("./new_gesture.html");
});
app.listen(9090);