const fs = require("fs");
const parse = require("csv-parse");

const kafka = require("kafka-node");
const Producer = kafka.Producer;
const client = new kafka.Client("localhost:2181");

const topic = "employees";

(KeyedMessage = kafka.KeyedMessage),
  (producer = new Producer(client)),
  (km = new KeyedMessage("key", "message")),
  (testProducerReady = false);

producer.on("ready", function() {
  console.log("Producer for tests is ready");
  testProducerReady = true;
});

producer.on("error", function(err) {
  console.error("Problem with producing Kafka message " + err);
});

const inputFile = "./dataFiles/MOCK_Employee_DATA.csv";

let dataArray = [];

let parser = parse({ delimiter: "," }, function(err, data) {
  dataArray = data;
  handleData(1);
});

//End Tempalte data Parse Kafka setup.git commit
fs.createReadStream(inputFile).pipe(parser);

function handleData(currentData) {
  let line = dataArray[currentData];
  let dataNode = {
    f_name: line[0],
    l_name: line[1],
    hire_date: line[2],
    event_id: "emp_chg_01"
  };
  console.log(JSON.stringify(dataNode));
  produceDataMessage(dataNode);
  let delay = 0;
  setTimeout(handleData.bind(null, currentData + 1), delay);
}

//create Keyed message from parsed json data and send it to kafka
function produceDataMessage(dataNode) {
  (KeyedMessage = kafka.KeyedMessage),
    (dataNodeKM = new KeyedMessage(dataNode.code, JSON.stringify(dataNode))),
    (payloads = [{ topic: topic, messages: dataNodeKM, partition: 0 }]);
  if (testProducerReady) {
    producer.send(payloads, function(err, data) {
      console.log(data);
      if (err) {
        console.log(
          "Sorry, TestProducer is not ready yet, failed to produce message to kafka with error ==== " +
            err
        );
      }
    });
  }
}
