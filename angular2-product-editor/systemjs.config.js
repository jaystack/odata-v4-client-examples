/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  // Backwards-compatibility mode for the loader to automatically add '.js' extensions when not present to module requests.
  System.defaultJSExtensions = true;



  /***************
   *     MAP     *
   ***************/

  // map tells the System loader where to look for things
  var map = {
    'app':                            'app', // 'dist',
    'rxjs':                           'node_modules/rxjs',
    '@angular':                       'node_modules/@angular',
    'angular2-in-memory-web-api':     'node_modules/angular2-in-memory-web-api',
    
    'jaydata/core':                   'lib/jaydata/jaydata.min',
    'jaydata/odata':                  'lib/jaydata/jaydataproviders/oDataProvider.min'
  };



  /*******************
   *    PACKAGES     *
   *******************/

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



  /***************
   *    META     *
   ***************/

  var meta = {
    'jaydata/odata': {
        format: 'cjs',
        deps: ['jaydata/core']
    }
  }

  var config = {
    map: map,
    packages: packages,
    meta: meta
  };

  System.config(config);

})(this);
