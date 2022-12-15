module.exports = {
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        maxWorkers: 1,
        pageTitle: 'Traceability Vocabulary Test Suite',
        // logoImgPath: './logo.png',
        publicPath: '../../docs/testsuite',
        filename: 'index.html',
        expand: true,
      },
    ],
  ],
};
