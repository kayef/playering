'use strict';

const uuid = require('node-uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'shops';

module.exports.post = (event, context, callback) => {


  const data = JSON.parse(event.body);
  const id = data.name.replace(/\W+/g, '-').toLowerCase();
  const timestamp = new Date().getTime();

  const shop = {
    id: id,
    name: data.name,
    code: data.code,
    remark: data.remark,
    isValid: 1,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const params = {
    TableName: TABLE_NAME,
    Item: shop,
    ConditionExpression: "attribute_not_exists(id)"
  };


  dynamoDB.put(params,
    (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error('Cannot post Shop'));
        return;
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(shop),
        headers: {"Access-Control-Allow-Origin": '*'},
      };

      callback(null, response);

    });
};

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: TABLE_NAME
  };

  dynamoDB.scan(params,
    (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error('Can\'t query Shop list'));
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
