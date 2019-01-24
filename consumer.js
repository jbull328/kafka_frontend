const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
var express = require("express");
const router = express.Router();

function GetMessage(message) {
  const client = kafka.Client("localhost:2181");
  topics = [
    {
      topic: "employees"
    }
  ];
  const options = {
    autoCommit: true
  };

  const consumer = new kafka.Consumer(client, topics, options);
  this.message = message;
  consumer.on("message", function(message, err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Here is the kafka message... " + JSON.stringify(message));
      console.log(message.value + ": ");
    }
  });
}
router.use(function(req, res, next) {
  next();
});

router.get("/", (req, res) => {
  // try {
  res.send("some route");
  // GetMessage();
  // res.status(200).json({ message: "route loaded " + message });
  // } catch (error) {
  //   res.status(400).send("Error, something went wrong.");
  // }
});

module.exports = router;
