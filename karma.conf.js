
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],
        reporters: ['spec', 'karma-typescript'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        files: [
            // js must be first since it loads global variables
            './src/**/*.js',
            './src/**/*.ts'
        ],
        preprocessors: {
            './**/*.ts': ['karma-typescript']
        },
        // do not specify plugins let karma load everything
        browsers: ['ChromeHeadless'],
        singleRun: true
    });
};
