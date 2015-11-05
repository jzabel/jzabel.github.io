/*
 * Generated on 2015-09-08
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    less: {
      bootstrap:{
        options: {
          paths: 'bower_components/bootstrap/less',
        },
        files: {
          '<%= config.dist %>/assets/css/bootstrap.css': 'bower_components/bootstrap/less/bootstrap.less'
        }
      },
      jeffzabel: {
        options: {
          paths: '<%= config.src %>/assets/less'
        },
        files: {
          '<%= config.dist %>/assets/css/jeffzabel.css': '<%= config.src %>/assets/less/jeffzabel.less'
        }
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    cssmin: {
      "<%= config.dist %>/assets/css/bootstrap.min.css": [
        "<%= config.dist %>/assets/css/bootstrap.css"
      ]
    },

    copy: {
      bootstrap_variables: {
        expand: true,
        cwd: '<%= config.src %>/assets/bootstrap/',
        src: '**',
        dest: 'bower_components/bootstrap/less/'
      },
      bootstrap_js: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/js/',
        src: '**',
        dest: '<%= config.dist %>/assets/js/'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml,css,eot,map,svg,ttf,woff,js,txt}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
    'cssmin',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
