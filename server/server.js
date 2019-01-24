var express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors");
var GetMessage = require("./consumer");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 4005;

app.listen(() => {
  console.log("listening on port " + port);
});
