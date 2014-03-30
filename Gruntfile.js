'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    // configurable paths
    vars: {
      //apiPath: ['api/*.js', 'api/**/*.js', 'api/**/**/*.js'],
      configPath: ['Gruntfile.js', 'grunt/**/*.js', 'config/*.js'],
      //stylesPath: ['assets/styles/utilities/*.styl', 'assets/styles/micro/*.styl', 'assets/styles/macro/*.styl', 'assets/styles/*.styl'],
      jsAssetsPath: ['assets/js/*.js', 'assets/js/**/*.js', 'assets/js/**/**/*.js'],
      //jsBowerPath: ['assets/vendor/**/*min.js', '!assets/vendor/**/angular.min.js'],
      //jsonPath: ['./*.json', '.jshintrc', '.jsbeautifyrc', 'tests/**/*.json'],
      //testsPath: ['tests/*.js', 'tests/**/*.js', 'tests/**/**/*.js'],
      //viewsPath: ['assets/views/*.jade', 'assets/views/**/*.jade', 'assets/views/**/**/*.jade'],
      tmpPath: '.tmp',
      buildPath: 'build',
    },

    
    concat: require('./grunt/concat'),
    concurrent: require('./grunt/concurrent'),
    copy: require('./grunt/copy'),
    jshint: require('./grunt/jshint'),
    uglify: require('./grunt/uglify'),
    //watch: require('./grunt/watch'),

    sass: {
      dev: {
        src: ['assets/styles/scss/main.scss'],
        dest: 'assets/styles/css/main.css',
      },
    },
    watch: {
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['assets/styles/scss/main.scss'],
        tasks: ['sass'],
      }
      // livereload: {
      //   // Here we watch the files the sass task will compile to
      //   // These files are sent to the live reload server after sass compiles to them
      //   options: { livereload: true },
      //   files: ['assets/styles/css/**/*'],
      // },
    },

  });



  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  
  //Compile sass
  grunt.registerTask('default', ['sass']);

  // Lint all files
  grunt.registerTask('lint', [
    'jsbeautifier:all',
    'jshint:all',
    'jsonlint:all',
  ]);

  // Build views
  grunt.registerTask('styles', [
    'concat:styles',
    'styl',
    'autoprefixer',
    'csso:optimize',
    'csslint',
  ]);

  // Build html
  grunt.registerTask('views', [
    'jade',
  ]);

  // Build js
  grunt.registerTask('js', [
    'copy:js',
    'concat:js',
    'uglify:compile',
  ]);

  // Build css, html & js
  grunt.registerTask('build', [
    'clean:before',
    'concurrent:build',
    'clean:after',
  ]);

  // Execute tests
  grunt.registerTask('test', [
    'mochaTest',
    'karma:unit',
  ]);

  // Check the performance of all tasks
  grunt.registerTask('time', [
    'lint',
    'styles',
    'views',
    'js',
    'test',
  ]);

  // Start server
  grunt.registerTask('server', [
    'concurrent:dev',
  ]);

  // Build, lint, test and server
  grunt.registerTask('default', [
    'lint',
    'build',
    'test',
    'server',
  ]);

  grunt.registerTask('default', 'Monitor JS and SCSS files for changes', 
    ['watch']);
};
