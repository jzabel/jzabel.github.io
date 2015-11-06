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
      build_css: {
        files: ['<%= config.src %>/templates/assets/{,*/}*.less'],
        tasks: ['build_css']
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
          paths: ['<%= config.src %>/templates/assets/less', 'bower_components/bootstrap/less']
        },
        files: {
          '<%= config.dist %>/assets/css/jeffzabel.css': '<%= config.src %>/templates/assets/less/jeffzabel.less'
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
        cwd: '<%= config.src %>/templates/assets/bootstrap/',
        src: '**',
        dest: 'bower_components/bootstrap/less/'
      },
      bootstrap_js: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/js/',
        src: '**',
        dest: '<%= config.dist %>/assets/js/'
      },
      cname: {
        src: 'CNAME',
        dest: '<%= config.dist %>/CNAME'
      }
    },

    // Create the ability to deploy our site (the dist folder) to github pages
    'gh-pages': {
      options: {
        base: 'dist',
        branch: 'master'
      },
      src: ['**']
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      build: ['<%= config.dist %>/**/*.{html,xml,css,eot,map,svg,ttf,woff,js,txt}'],
      css: ['<%= config.dist %>/**/*.{css}']
    },

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'copy',
    'less',
    'cssmin',
    'assemble'
  ]);

  grunt.registerTask('build_css', [
    'clean:css',
    'copy',
    'less',
    'cssmin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'gh-pages'
  ]);

};
