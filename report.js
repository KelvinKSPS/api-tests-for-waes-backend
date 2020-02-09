var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: 'test/report/cucumber_report.json',
    output: 'test/report/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        'Application Name': 'Backend For Testers',
        'App Version': '0.0.1',
        'Test Environment': 'Local',
    }
};

reporter.generate(options);
