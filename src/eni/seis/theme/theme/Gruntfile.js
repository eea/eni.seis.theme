module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);


  // Config
  var merge = require('merge'),
      config = {};

  config.path = {
    'static': '.',
    'src': 'src',
    'node': 'node_modules'
  };

  [
    require('./grunt/development.js'),
    require('./grunt/production.js')
  ].forEach(function(settings) {
    config = merge.recursive(true, config, settings);
  });

  grunt.initConfig(config);


  // Tasks
  grunt.registerTask('development', [
    'less:development',
    'concat'
  ]);

  grunt.registerTask('production', [
    'less:production',
    // 'copy',
    'concat',
    'uglify',
    'postcss'
  ]);

  grunt.registerTask('default', [
    'development',
    'watch'
  ]);
};
