/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  // Backwards-compatibility mode for the loader to automatically add '.js' extensions when not present to module requests.
  System.defaultJSExtensions = true;

  // map tells the System loader where to look for things
  var map = {
    'app':                            'app', // 'dist',

    '@angular':                       'node_modules/@angular',
    'angular2-in-memory-web-api':     'node_modules/angular2-in-memory-web-api',
    'rxjs':                           'node_modules/rxjs',
    'jaydata/core':                   'lib/jaydata/jaydata.min',
    'jaydata/odata':                  'lib/jaydata/jaydataproviders/oDataProvider'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main' },
    'app/services':               { main: 'index' },

    'angular2-in-memory-web-api': { main: 'index' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  // No umd for router yet
  packages['@angular/router'] = { main: 'index' };

  var jaydata = {
    'jaydata/core': {
        format: 'cjs'
    },
    'jaydata/odata': {
        format: 'cjs',
        deps: ['jaydata/core']
    },
    './JayDataContext': {
        deps: ['jaydata/core', 'jaydata/odata']
    }
  }

  var config = {
    map: map,
    packages: packages,
    meta: jaydata
  };

  System.config(config);

})(this);
