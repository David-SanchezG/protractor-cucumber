# Prerequisites

You just need to install Node.js from https://nodejs.org/

# Get it ready
<pre>npm install</pre>
<pre>./node_modules/protractor/bin/webdriver-manager update</pre>
<pre>./node_modules/protractor/bin/webdriver-manager start</pre>

# Run
./node_modules/protractor/bin/protractor protractor.conf<br> 
or<br>
./node_modules/protractor/bin/protractor protractorConf.js --tags "@this and not @that"

## Running types
### Sequential
Just keep shardTestFiles as false and the features you specify will be run sequentially.

### Parallel
In order to run in parallel open protractorConf.js and set shardTestFiles to true, please make sure to set maxInstances to a certain number so that it does not kill your resources.

* If you use parallel option then a browser will be open for every feature that you have under features folder.

## Report
In order to generate the report correctly, 
* if you run sequentially just write in command line<pre>node generateReport.js</pre>
* if you run in parallel then you will have to first do<pre>node reportsMerger.js</pre>
and then<pre>node generateReport.js</pre>
