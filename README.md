Send log data to Loggly from iMacros for firefox scripts

# Tests
To run the tests you must first build them with browserify. Install the devDependencies to get browserify
```bash
npm install
make bundle
```
Create a config file in the test directory called **config.json**. At a bare minimum this file must contain a **logglyInput** key value pair. See *test/sampleConfig.json* for an example
```javascript
{
  "logglyInput": "really-long-key-you-got-from-loggly"
}
```

Then open up the dist folder in iMacros for Firefox and run the tests.
