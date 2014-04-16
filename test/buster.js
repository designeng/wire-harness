require('gent/test-adapter/buster');

module.exports['node'] = {
    environment: 'node',
    rootPath: "../",
    // libs: ["bower_components/when/when.js"],
    tests: ['test/node/**/*-test.js']
};