const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const GetMessage = require("./consumer");



const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/employees", GetMessage);

app.listen(process.env.PORT || 3000, function() {
  console.log("Kafka Frontend Dev site running");
});
