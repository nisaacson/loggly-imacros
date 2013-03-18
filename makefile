BROWSERIFY=node_modules/.bin/browserify
bundle:
	$(BROWSERIFY) test/log-test.js -o dist/log-test.js