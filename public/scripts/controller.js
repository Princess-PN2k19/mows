// basic functionalities
var address = document.getElementById('address');
var clickConnect = document.getElementById('btn-connect');
var clickDisconnect = document.getElementById("btn-disconnect");
var Status = document.getElementById("status");
var publishTopic = document.getElementById('pub-topic');
var pubPayload = document.getElementById('payload');
var clickPublish = document.getElementById('btn-publish');
var inputSubscribe = document.getElementById('sub-topic');
var clickSubscribe = document.getElementById('btn-subscribe');
var clickUnsubscribe = document.getElementById('btn-unsubscribe');
var timeStamp;

clickConnect.addEventListener('click', function () {
	client = mqtt.connect(address.value);
	Status.value = "Connecting....";

	client.on("connect", function () {
		Status.value = "Connected Successfully!";
		clickPublish.disabled = false;
		clickSubscribe.disabled = false;
		clickUnsubscribe.disabled = false;
	})

	
	clickPublish.addEventListener('click', function () {
		client.publish(publishTopic.value, pubPayload.value);
		timeStamp = new Date();
		var trPublish = document.createElement("tr");
		var tdTopicPublish = document.createElement("td");
		var tdPayloadPublish = document.createElement("td");
		var tdTimeStampPublish = document.createElement("td");
		tdTopicPublish.style.fontSize = '11px';
		tdPayloadPublish.style.fontSize = '11px';
		tdTimeStampPublish.style.fontSize = '11px';
		tdTopicPublish.appendChild(document.createTextNode(publishTopic.value));
		tdPayloadPublish.appendChild(document.createTextNode(pubPayload.value));
		tdTimeStampPublish.appendChild(document.createTextNode(timeStamp));
		trPublish.appendChild(tdTopicPublish);
		trPublish.appendChild(tdPayloadPublish);
		trPublish.appendChild(tdTimeStampPublish);
		tBodyPub.appendChild(trPublish);
	})

	clickSubscribe.addEventListener('click', function () {
		client.subscribe(inputSubscribe.value);
		timeStamp = new Date();
		var trSubscribe = document.createElement("tr");
		var tdTopicSubscribe = document.createElement("td");
		var tdTimeStampSubscribe = document.createElement("td");
		tdTimeStampSubscribe.style.fontSize = "11px";
		tdTopicSubscribe.style.fontSize = "11px";
		tdTopicSubscribe.appendChild(document.createTextNode(inputSubscribe.value));
		tdTimeStampSubscribe.appendChild(document.createTextNode(timeStamp));
		trSubscribe.appendChild(tdTopicSubscribe);
		trSubscribe.appendChild(tdTimeStampSubscribe);
		tBodySub.appendChild(trSubscribe);
	})

	client.on("message", function (topic, payload) {
		timeStamp = new Date();
		var tr = document.createElement("tr");
		var tdTopic = document.createElement("td");
		var tdPayload = document.createElement("td");
		var tdTimeStamp = document.createElement("td");
		tdTopic.style.fontSize = "11px";
		tdPayload.style.fontSize = "11px";
		tdTimeStamp.style.fontSize = "11px";
		tdTopic.appendChild(document.createTextNode(topic));
		tdPayload.appendChild(document.createTextNode(payload));
		tdTimeStamp.appendChild(document.createTextNode(timeStamp));
		tr.appendChild(tdTopic);
		tr.appendChild(tdPayload);
		tr.appendChild(tdTimeStamp);
		tBody.appendChild(tr);
	})

	clickUnsubscribe.addEventListener('click', function () {
		client.unsubscribe("mqtt/" + inputSubscribe.value);
	})

	clickDisconnect.addEventListener("click", function () {
		client.end();
		Status.value = "Disconnected succesfully!";
		clickPublish.disabled = true;
		clickSubscribe.disabled = true;
		clickUnsubscribe.disabled = true;
	})
});













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