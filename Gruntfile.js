// Generated on 2013-06-22 using generator-webapp 0.2.3
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist',
		tmp: '.tmp',
		plato: 'plato'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			options: {
				nospawn: true
			},
			stylus: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.styl'],
				tasks: ['stylus:compile']
			},
			jade: {
				files: ['<%= yeoman.app %>/{,*/}*.jade'],
				tasks: ['jade:compile']
			},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= yeoman.app %>/*.html',
					'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},
		connect: {
			options: {
				port: 8000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0' //'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, yeomanConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'test')
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.dist)
						];
					}
				}
			},
			plato: {
				options: {
					port: 8001,
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.plato)
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			},
			plato: {
				path: 'http://localhost:<%= connect.plato.options.port %>'
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'!Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js',
				'!<%= yeoman.app %>/scripts/vendor/*',
				'!<%= yeoman.app %>/scripts/polyfills.js',
				'!<%= yeoman.app %>/scripts/lib/Tween.js',
				'!<%= yeoman.app %>/scripts/i18n/*',
				'test/spec/{,*/}*.js'
			]
		},
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://localhost:<%= connect.options.port %>/index.html']
				}
			}
		},
		jade: {
			compile: {
				options: {},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: '{,*/}*.jade',
						dest: '<%= yeoman.tmp %>',
						ext: '.html'
				}]
			},
			dist: {
				options: {},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: '{,*/}*.jade',
						dest: '<%= yeoman.dist %>',
						ext: '.html'
				}]
			}
		},
		stylus: {
			compile: {
				options: {
					paths: ['<%= yeoman.app %>/styles/'],
					use: [
						require('nib')
					]
				},
				files: {
					'<%= yeoman.tmp %>/styles/main.css': ['<%= yeoman.app %>/styles/{,*/}*.styl']
				}
			},
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/main.css': [
						'<%= yeoman.app %>/bower_components/normalize-css/{,*/}*.css',
						'<%= yeoman.app %>/styles/{,*/}*.styl'
					]
				}
			}
		},
		// not used since Uglify task does concat,
		// but still available if needed
		/*concat: {
			dist: {}
		},*/
		requirejs: {
			almond: {
				options: {
					name: '../bower_components/almond/almond',
					out: yeomanConfig.dist + '/scripts/main.js',
					baseUrl: yeomanConfig.app + '/scripts',
					optimize: 'none', // need to turn off variable munging
					//optimize: 'uglify2',
					mainConfigFile: yeomanConfig.app + '/scripts/main.js',
					include: ['main'],
					insertRequire: ['main'],
					wrap: true
				}
			},
			dist: {
				// Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
				options: {
					// `name` and `out` is set by grunt-usemin
					name: 'main',
					out: yeomanConfig.dist + '/scripts/main.js',
					baseUrl: yeomanConfig.app + '/scripts',
					optimize: 'uglify2',
					mainConfigFile: yeomanConfig.app + '/scripts/main.js',
					// TODO: Figure out how to make sourcemaps work with grunt-usemin
					// https://github.com/yeoman/grunt-usemin/issues/30
					//generateSourceMaps: true,
					// required to support SourceMaps
					// http://requirejs.org/docs/errors.html#sourcemapcomments
					preserveLicenseComments: false,
					useStrict: true,
					wrap: true
					//uglify2: {} // https://github.com/mishoo/UglifyJS2
				}
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},
		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>'
			},
			html: '<%= yeoman.tmp %>/index.html'
		},
		usemin: {
			options: {
				dirs: ['<%= yeoman.dist %>']
			},
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: [] // ['<%= yeoman.dist %>/styles/{,*/}*.css']
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/main.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.app %>/styles/{,*/}*.css'
					]
				}
			}
		},
		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'images/{,*/}*.{webp,gif}',
						'styles/fonts/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: [
						'generated/*'
					]
				}]
			}
		},
		concurrent: {
			server: [
				'stylus:compile',
				'jade:comile'
			],
			test: [
				'stylus'
			],
			dist: [
				'useminPrepare',
				'stylus:dist',
				'imagemin',
				'svgmin',
				'requirejs:almond'
			]
		},
		bower: {
			options: {
				exclude: ['modernizr']
			},
			all: {
				rjsConfig: '<%= yeoman.app %>/scripts/main.js'
			}
		},
		plato: {
			options: {
				jshint: grunt.file.readJSON('.jshintrc')
				//jshint: false
			},
			report: {
				files: {
					'<%= yeoman.plato %>': [
						'app/scripts/**/*.js'
					]
				}
			}
		}
	});

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run([/*'build',*/ 'open:server', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			//'concurrent:server',
			'stylus:compile',
			'jade:compile',
			'connect:livereload',
			'open:server',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'connect:test',
		'mocha'
	]);

	grunt.registerTask('builtHtmlWarning', function() {
		grunt.log.warn('Don\'t forget to fix dist/index.html. See yeoman/grunt-usemin#44');
	});

	grunt.registerTask('build', [
		'clean:dist',
		'jade:dist',
		'concurrent:dist',
		'copy',
		//'rev',
		'usemin',
		'builtHtmlWarning'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);

	grunt.registerTask('report', [
		'plato:report',
		'open:plato',
		'connect:plato:keepalive'
	]);

};
