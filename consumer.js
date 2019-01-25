var kafka = require("kafka-node");

var express = require("express");
var router = express.Router();
var messageData = [];

function GetMessage(message) {
  var Consumer = kafka.Consumer;
  var data = [];
  const client = kafka.Client("localhost:2181");
  topics = [
    {
      topic: "employees"
    }
  ];
  const options = {
    autoCommit: true,
    fromBeginning: true
  };

  var consumer = new kafka.Consumer(client, topics, options);
  this.message = message

  
   consumer.on("message", function(message, err) {
  
    if (err) {
      console.log(err);
    } else {
      console.log("Here is the kafka message... " + JSON.stringify(message));
      console.log(message.value);
      data.push(message.value);
     
    }
      if (message.event_data === "emp_chng_02") {
        console.log("A change happened for employee " + message.f_name + " " + message.l_name + ".")
      }
      messageData.push(data);
  });
  console.log(messageData)
}





router.use(function(req, res, next) {
  next();
});

GetMessage();
router.get("/api/employees", (req, res) => {
  messageData.forEach(function(message, error) {
    if (message) {
      res.send({key: message});
    } else if (error) {
      res.status(400).send("Error, something went wrong.");
    }
  });
});

module.exports = router;
