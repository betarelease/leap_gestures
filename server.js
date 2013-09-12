var express = require('express'),
    app = express();

app.use("/js", express.static("js"));

app.get('/', function(req, res){
  res.sendfile("./new_gesture.html");
});
app.listen(9090);