var rk = require('required-keys');
module.exports = function (data, cb) {
  var keys = ['logglyInputKey', 'body']
  var err = rk.truthySync(data, keys)
  if (err) {
    return cb({
      message: 'error posting log data to Loggly, missing key in supplied data',
      error: err
    })
  }
  var xhr = new XMLHttpRequest();
  var async = true
  var logglyInputKey = data.logglyInputKey
  var body = data.body

  var url = 'https://logs.loggly.com/inputs/' + logglyInputKey
  var bodyString = JSON.stringify(body)
  xhr.open("POST", url, async);
  xhr.setRequestHeader('content-type', 'application/json');
  iimDisplay('sending log data to loggly now: ' + JSON.stringify(data))
  xhr.onreadystatechange = function(ev){
    if(xhr.readyState === 4 && xhr.status === 200){
      parseResponse(xhr, cb);
    }
  }
  xhr.send(bodyString);

}

function parseResponse(xhr, cb) {
  var body = xhr.response
  var resData
  try {
    resData = JSON.parse(body)
    iimDisplay('sent log data to loggly, resData: ' + JSON.stringify(resData))
  }
  catch(err) {
    iimDisplay('error sending log data to loggly, error: ' + JSON.stringify(err))
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
