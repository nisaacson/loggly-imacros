var _ = require('underscore')
var async = require('async')
var readFile = require('imacros-read-file');
var log =  require('../index')

// Execute a dummy macro to wake-up Firefox and give some immediate feedback that the tests have started
iimPlay('CODE: SET !TMEOUT_TAG 0\n'
        + 'TAG POS=1 TYPE=BODY ATTR= EXTRACT=TXT')
runTests(function (err) {
  if (err) {
    alert('tests failed: ' + JSON.stringify(err))
    return
  }
  iimDisplay('tests pass')
})
function runTests(callback) {
  iimDisplay('running log test')
  var configFilePath = 'file:///users/noah/src/imacros/loggly-imacros/test/config.json'
  loadConfigFile(configFilePath, function (err, config) {
    var logglyInputKey = config.logglyInputKey
    // get a random number between 1 and 10

    var logNumber = 0
    var numLogs = 10
    var range = _.range(0,numLogs)
    async.forEach(
      range,
      function (cb) {
        var count = Math.floor((Math.random()*10)+1);
        var logData = {
          body: {
            testKey: "testValue",
            count: count
          },
          logglyInputKey: logglyInputKey
        }
        log(logData, function (err) {
          alert('log number: ' + logNumber + ', data: ' + JSON.stringify(logData, null, ' '))
          cb(err)
        })
      },
      function (err) {
        alert('done with all logs')
        callback(err)
      }
    )
  })
}

function loadConfigFile(filePath, cb) {
  readFile(filePath, function (err, reply) {
    if (err) { return cb(err); }
    var data = JSON.parse(reply);
    cb(null, data);
  });
}
