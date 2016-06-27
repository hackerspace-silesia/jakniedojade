module.exports=function(grunt)
{

var fakePort='8000';
var defaultPort='9000';

grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        'public/build/output.min.js': ['public/js/*.js']
      }
    }
  },

  cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/build/output.min.css': ['public/css/*.css']
        }
      }
    },

   json_server: {
      custom_options: {
        options: {
          db: 'db.json',
          routes: 'fake_routes.json',
          hostname: 'localhost',
          port: fakePort,
          customRoutes: require('./fake_custom_routes')
        }
      }
    },
   
  open : {
          def:
          {
              path: 'http://localhost:'+defaultPort+'/public/index.html',
          },
          fake:
          {
              path: 'http://localhost:'+fakePort,
          },
      },

connect: {
    server: {
      options: {
        port: defaultPort,
        base: 'public/index.html'
      }
    }
  },

 watch: {
  options: {
    livereload: true,
  },
  html: {
    files: ['public/index.html'],
  },
  js: {
    files: ['public/js/*.js'],
     tasks: [ 'jshint']
  },
  css: {
    files: ['public/css/*.css'],
   
  }
},

    concurrent: {
   
     serverWithFakeApi: 
     {
      
        tasks: ['json_server', 'open:fake','watch' ],
         options: {
          logConcurrentOutput: true
        }
      },
         server: 
         {
      
        tasks: ['connect','watch','open:def'],
         options: {
          logConcurrentOutput: true
        }

      },
  },

   jshint: {
    all: ['gruntFile.js', 'public/js/*.*']
  }

});

 grunt.registerTask('default', ['concurrent:server']);
 grunt.registerTask('start_fake', ['concurrent:serverWithFakeApi']);
 grunt.registerTask('minimalize', ['uglify','cssmin']);

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-json-server');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');

};