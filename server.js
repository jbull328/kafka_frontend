var express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors");
var GetMessage = require("./consumer");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", function(req, res) {
  res.send("landing");
});

var port = process.env.PORT || 4005;

app.listen(() => {
  console.log("listening on port " + port);
});
