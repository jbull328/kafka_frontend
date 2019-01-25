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

app.get("/api/employees", GetMessage);

app.listen(process.env.PORT || 3000, function() {
  console.log("Kafka Frontend Dev site running");
});
