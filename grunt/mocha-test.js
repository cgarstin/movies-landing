'use strict';

module.exports = {
  dot: {
    options: {
      reporter: 'dot',
      require: 'chai'.assert
    },

    src: '<%= vars.testsPath %>',
  }
};
