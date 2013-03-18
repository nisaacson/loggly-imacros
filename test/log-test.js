var readFile = require('imacros-read-file');
var log =  require('../index')
runTests(function (err) {
  if (err) {
    alert('tests failed: ' + JSON.stringify(err))
    return
  }
  iimPlay('tests pass')
})
function runTests(cb) {
  var configFilePath = 'file:///users/noah/src/imacros/loggly-imacros/test/config.json'
  loadConfigFile(configFilePath, function (err, config) {
    var logData = {
      body: {
        testKey: "testValue"
      },
      config: config
    }
    log(logData, function (err) {
      if (err) { return cb(err) }

    })
  })
}

function loadConfigFile(filePath, cb) {
  readFile(filePath, function (err, reply) {
    if (err) { return cb(err); }
    var data = JSON.parse(reply);
    cb(null, data);
  });
}
