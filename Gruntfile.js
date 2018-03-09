module.exports = function (grunt) {

  grunt.initConfig({
    clean: {
        dist: ['dist/']
    },
    jshint: {
        dist: {
            src: ['src/ng-bootstrap-year-calendar.js']
        }
    },
    uglify: {
        dist: {
            src: ['src/ng-bootstrap-year-calendar.js'],
            dest: 'dist/ng-bootstrap-year-calendar.min.js'
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.registerTask('min', ['clean:dist','jshint:dist', 'uglify:dist' ]);

};
