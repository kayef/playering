'use strict';

const uuid = require('node-uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'vouchers';

function redeemVoucher(voucher) {

  //TODO: Need to add in a conditional expression to only redeem vouchers that have a redeemed value of 0

  const timestamp = new Date().getTime();
  const initialRedeemed = 0;

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: voucher.id
    },
    UpdateExpression: "SET redeemed = :redeemed, redeemedAt = :timestamp",
    ConditionExpression: "redeemed = :initialRedeemed",
    ExpressionAttributeValues: {
      ":redeemed": 1,
      ":timestamp": timestamp,
      ":initialRedeemed": initialRedeemed
    },
    ReturnValues: "ALL_NEW"
  };

  dynamoDB.update(params, (error, result) => {
    if(error) {
      console.log(error);
    }
    console.log(result);
    return {
      error: error,
      result: result
    }
  })
}

module.exports.post = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if(typeof data.playerName != 'string') {
    console.error('Validation Failed');
    callback(null, {statusCode: 404, body: JSON.stringify({ message: "'Couldn\'t create Voucher'" })});
    return;
  }

  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: uuid.v4(),
      playerUserId: data.playerUserId,
      playerName: data.playerName,
      playerContactNumber: data.playerContactNumber,
      playerId: data.playerId,
      total: data.total,
      isValid: 1,
      redeemed: 0,
      shopId: data.shopId,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };

  dynamoDB.put(params, (error, result) => {
    if(error) {
      console.error(error);
      callback(new Error('Couldn\'t create Voucher'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
      headers: {"Access-Control-Allow-Origin": '*'},

    };

    callback(null, response);
  })

};

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "isValid-createdAt-index",
    KeyConditionExpression: "isValid = :isValid",
    ExpressionAttributeValues: {":isValid": 1}
  };

  dynamoDB.query(params,
    (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error('Can\'t query Voucher list'));
        return;
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
        headers: {"Access-Control-Allow-Origin": '*'},
      };

      callback(null, response);
    })
};

module.exports.query = (event, context, callback) => {

  const data = event.queryStringParameters;
  const fromDate = parseInt(data.fromDate);
  const toDate = parseInt(data.toDate);
  const shopId = data.shopId;

  console.log(fromDate);
  console.log(toDate);
  console.log(shopId);

  const params = {
    TableName: TABLE_NAME,
    IndexName: "shopId-createdAt-index",
    KeyConditionExpression: "shopId = :shopId AND createdAt BETWEEN :fromDate AND :toDate",
    ExpressionAttributeValues: {
      ":shopId": shopId,
      ":fromDate": fromDate,
      ":toDate": toDate
    }
  };

  dynamoDB.query(params,
    (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error('Can\'t query Voucher list'));
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

module.exports.queryVoucherPendingForPlayerContactNumber = (event, context, callback) => {

  const data = event.queryStringParameters;
  const playerContactNumber = data.playerContactNumber;
  const redeemed = +data.redeemed;
  const shopId = data.shopId;

  console.log(playerContactNumber);
  console.log(redeemed);
  console.log(shopId);

  const params = {
    TableName: TABLE_NAME,
    IndexName: "playerContactNumber-redeemed-index",
    KeyConditionExpression: "playerContactNumber = :playerContactNumber AND redeemed = :redeemed",
    ExpressionAttributeValues: {
      ":playerContactNumber": playerContactNumber,
      ":redeemed": redeemed
    }
  };

  dynamoDB.query(params,
    (error, result) => {
      if(error) {
        console.log(error);
        callback(new Error("Can\'t' query voucher by playerContactNumber"));
        return;
      }

      console.log(result);

      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
        headers: {"Access-Control-Allow-Origin": "*"}
      };

      callback(null, response);
    }
  )

};

module.exports.queryVoucherByRedeemedAt = (event, context, callback) => {

  const data = event.queryStringParameters;
  const shopId = data.shopId;
  const redeemed = 1;
  const fromDate = +data.fromDate;
  const toDate = +data.toDate;

  const params = {
    TableName: TABLE_NAME,
    IndexName: "shopId-redeemedAt-index",
    KeyConditionExpression: "shopId = :shopId AND redeemedAt BETWEEN :fromDate AND :toDate",
    FilterExpression: "redeemed = :redeemed",
    ExpressionAttributeValues: {
      ":shopId": shopId,
      ":fromDate": fromDate,
      ":toDate": toDate,
      ":redeemed": redeemed
    }
  };

  dynamoDB.query(params,
    (error, result) => {
      if(error) {
        console.log(error);
        callback(new Error("Cant queryCurrentVoucher"));
        return;
      }

      console.log(result);

      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
        headers: {"Access-Control-Allow-Origin": "*"}
      };

      callback(null, response);
    })

};

module.exports.queryVoucherPending = (event, context, callback) => {

  const data = event.queryStringParameters;
  const shopId = data.shopId;
  const redeemed = +data.redeemed;

  console.log(shopId);
  console.log(redeemed);

  const params = {
    TableName: TABLE_NAME,
    IndexName: "shopId-redeemed-index",
    KeyConditionExpression: "shopId = :shopId AND redeemed = :redeemed",
    ExpressionAttributeValues: {
      ":shopId": shopId,
      ":redeemed": redeemed
    }
  };

  dynamoDB.query(params,
    (error, result) => {
      if(error) {
        console.log(error);
        callback(new Error("Can\'t' queryPendingVoucher"));
        return;
      }

      console.log(result);

      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
        headers: {"Access-Control-Allow-Origin": "*"}
      };

      callback(null, response);
    }
  )

}

module.exports.queryValidVouchers = (event, context, callback) => {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "isValid = :isValid",
    ExpressionAttributeValues: {
      ":isValid": {"N":"1"}
    }
  };

  dynamoDB.query(params,
    (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error('Can\'t query Voucher'));
        return;
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
        headers: {"Access-Control-Allow-Origin": '*'},
      };

      callback(null, response);
    })
}

module.exports.redeemSelectedVouchers = (event, context, callback) => {

  //Return a list of vouchers with redeem status of fail or pass

  var vouchers = JSON.parse(event.body);

  for(var i=0;i<vouchers.length;i++) {
    vouchers[i].redeemStatus = redeemVoucher(vouchers[i]);
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify(vouchers),
    headers: {"Access-Control-Allow-Origin": '*'},
  };

  console.log(vouchers);
  callback(null, response);

}
