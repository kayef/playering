'use strict';

const uuid = require('node-uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'players';

module.exports.post = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  //TODO: Need to check for duplicate name, contact number and userId before saving

  var remark = 'None';
  if(data.remark) {
    remark = data.remark;
  };

  const player = {
    id: uuid.v4(),
    userId: data.userId,
    name: data.name,
    contactNumber: data.contactNumber,
    remark: remark,
    isValid: 1,
    shopId: data.shopId,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  const params = {
    TableName: TABLE_NAME,
    Item: player
  };

  const scanParams = {
    TableName: TABLE_NAME,
    FilterExpression: '#nm = :name',
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":name": data.name
    }
  };

  dynamoDB.scan(scanParams,
    (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error('Cannot scan Player table for duplicates'));
        return;
      }

      if (result.Count > 0) {
        callback(new Error('[422] Player already exist'));
      }
    });

  dynamoDB.put(params,
    (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error('Cannot post Player'));
        return;
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(player),
        headers: {"Access-Control-Allow-Origin": '*'},
      };

      callback(null, response);

    })
};

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: TABLE_NAME
  };

  dynamoDB.scan(params,
    (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error('Can\'t query Player list'));
        return;
      }

      console.log(result);

      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
        headers: {"Access-Control-Allow-Origin": '*'},
      };

      callback(null, response);
    })
};

module.exports.update = (event, context, callback) => {

  console.log(event);

  const pathParameters = event.pathParameters;
  const playerId = pathParameters.playerId;
  var data = JSON.parse(event.body);

  const params = {
    "Key": {
      "id": playerId
    },
    "UpdateExpression": "SET userId = :uid, #nm = :n, contactNumber = :contactNumber, remark = :r, shopId = :si",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    "ExpressionAttributeValues": {
      ":uid": data.userId,
      ":n": data.name,
      ":contactNumber": data.contactNumber,
      ":r": data.remark,
      ":si": data.shopId,
    },
    "ReturnValues": "ALL_NEW",
    "TableName": TABLE_NAME
  };

  dynamoDB.update(params,
    (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error('Can\'t update Player'));
        return;
      }

      console.log(result);

      const response = {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {"Access-Control-Allow-Origin": '*'},
      };

      callback(null, response);
    })
}
