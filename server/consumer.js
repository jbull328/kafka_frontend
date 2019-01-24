const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
const client = kafka.Client("localhost:2181");
const router = express.Router();

topics = [
  {
    topic: "employees"
  }
];
const options = {
  autoCommit: true
};

const consumer = new kafka.Consumer(client, topics, options);

function GetMessage(message) {
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

router.route("/").get((req, res) => {
  try {
    GetMessage();
    res.status(200).json({ message: "route loaded " + message });
  } catch (error) {
    res.status(400).send("Error, something went wrong.");
  }
});

module.exports = {
  GetMessage: GetMessage
};
