var rk = require('required-keys');
module.exports = function (data, cb) {
  var keys = ['inputKey', 'body']
  var err = rk.truthySync(data, keys)
  if (err) {
    return cb({
      message: 'error posting log data to Loggly, missing key in supplied data',
      error: err
    })
  }
  var xhr = new XMLHttpRequest();
  var async = false
  var inputKey = data.inputKey
  var body = data.body
  var url = 'https://logs.loggly.com/inputs/' + inputKey
  xhr.open("POST", url, async);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(body);
  iimDisplay('sent post');
  iimDisplay('add response: ' + xhr.response);
  parseResponse(xhr, cb);
}

function parseResponse(xhr, cb) {
  var body = xhr.response
  var resData
  try {
    resData = JSON.parse(body)
  }
  catch(err) {
    return cb({
      message: 'error posting log data to Loggly, failed to parse json response from Loggly after posting data',
      error: err,
      logglyResponse: body
    })
  }

  var statusCode = xhr.status
  if (statusCode !== 200) {
    return cb({
      message: 'error posting log data to Loggly',
      error: 'bad status code',
      statusCode: statusCode,
      logglyResponse: body
    })
  }
  cb()
}
