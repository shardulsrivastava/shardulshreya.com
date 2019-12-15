'use strict';

module.exports.endpoint = (event, context, callback) => {

  const querystring = require('querystring');
  // Our raw request body will be in evt.body.
  const params = querystring.parse(event.body);

  var name = params['name'];
  var email = params['email'];
  var message = params['message'];

  console.log('Name => ', name);
  console.log('Email => ', email);
  console.log('Message => ', message);
  /* SNS Code Start*/
  var AWS = require('aws-sdk');


  AWS.config.update({
    region: 'ap-south-1'
  });

  var sns = new AWS.SNS({
    apiVersion: '2010-03-31'
  });
  var message = "A Friend is going to attend your wedding.\n Name : " + name + ", Email : " + email + " .\n His Message for you : " + message + " .";
  var publishParams = {
    TopicArn: "arn:aws:sns:ap-south-1:707073652520:wedding-registration",
    Message: message,
    Subject: 'Wedding Bells Invitation',
  };

  sns.publish(publishParams, function(err, data) {
    console.log("Error", err);
    console.log("Data", data);
  });

  /* SNS Code End */

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`,
    }),
  };

  callback(null, response);
};