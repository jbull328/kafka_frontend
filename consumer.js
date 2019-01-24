var kafka = require("kafka-node");

var express = require("express");
var router = express.Router();
var data = [];

function GetMessage(message) {
  var Consumer = kafka.Consumer;
  const client = kafka.Client("localhost:2181");
  topics = [
    {
      topic: "employees"
    }
  ];
  const options = {
    autoCommit: true
  };

  var consumer = new kafka.Consumer(client, topics, options);
  this.message = message;
  consumer.on("message", function(message, err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Here is the kafka message... " + JSON.stringify(message));
      console.log(message.value + ": ");
      data = data.push(message);
      return data;
    }
  });
}

router.use(function(req, res, next) {
  next();
});

GetMessage();
router.get("/", (req, res) => {
  data.forEach(function(message) {
    try {
      res.status(200).json(message);
    } catch (error) {
      res.status(400).send("Error, something went wrong.");
    }
  });
});

module.exports = router;
