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


producer.on("error", function(err) {
  console.error("Problem with producing Kafka message " + err);
});

const inputFile = "./dataFiles/MOCK_Employee_Changes.csv";

var dataArray = [];



//End Tempalte data Parse Kafka setup.git commit


//create Keyed message from parsed json data and send it to kafka//send the array of messages one at a time so none get skipped.

producer.on('ready', function() {
  var parser = parse({ delimiter: "," }, function(err, data) {
    dataArray = data;
    handleData(1);
  });

  fs.createReadStream(inputFile).pipe(parser);

  const handleData = function(currentData)  {
    let messageArray = [];
    let line = dataArray[currentData];
    let dataNode = {
      f_name: line[0],
      l_name: line[1],
      hire_date: line[2],
      event_id: line[3]
    };
    // console.log(JSON.stringify(dataNode));

    //create individual message with csv parser and [ush them to an array.]
    (KeyedMessage = kafka.KeyedMessage),
    (dataNodeKM = new KeyedMessage(dataNode.code, JSON.stringify(dataNode)));

    dataArray.forEach(element => {
      messageArray.push({ topic: topic, messages: dataNodeKM, partition: 0 }); 
    });
    let delay = 90;
    setTimeout(handleData.bind(null, currentData + 1), delay);
    produceDataMessage(messageArray);
  }

  function produceDataMessage(messageArray) {
  
  
 
    console.log(messageArray);
    payloads = messageArray;
    
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
});
