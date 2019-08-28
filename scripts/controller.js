// basic functionalities
var connect = document.getElementById('btn-connect')
var disconnect = document.getElementById('btn-disconnect')
var status = document.getElementById('status')
var publish = document.getElementById('btn-publish')
var subscribe = document.getElementById('btn-subscribe')
var unsubscribe = document.getElementById('btn-unsubscribe')
var 

client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")


connect.addEventListener('click', function(e) {
	e.preventDefault();
	client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
	document.getElementById('status').value = "Connected successfully!";

	subscribe.addEventListener('click', function() {
		client.subscribe(document.getElementById('topic').value)
	})

	unsubscribe.addEventListener('click', function() {
		client.subscribe(document.getElementById('topic').value + 'un')
		document.getElementById('sub-topic').value = "";
	})

	publish.addEventListener('click', function() {
		client.on("message", function(topic, payload) {
			console.log([topic, payload].join(": "));
		})
	})
})

disconnect.addEventListener('click', function() {
	client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
	client.end();
	document.getElementById('status').value = "Disconnected!";
})






// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
