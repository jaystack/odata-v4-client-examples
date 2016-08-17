requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',

        'jaydata/core': '../lib/jaydata/jaydata.min',
        'jaydata/odata': '../lib/jaydata/jaydataproviders/oDataProvider.min',
        'jaydata-model': '../jaydata-model',
        'services': './services'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'jaydata-model/Northwind': {
            deps: ['jaydata/odata']
        }
    }
});

require(["bootstrap"])
define(function (require) {
    var system = require('durandal/system'),
        viewLocator = require('durandal/viewLocator'),
        app = require('durandal/app'),
        northwind = require("services/northwind");

    system.debug(true);

    viewLocator.convertModuleIdToViewId = function (moduleId) {
        return moduleId.replace("viewmodels", "views");
    }

    app.title = 'JayData example app';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    northwind.init()
        .subscribe(function () {
            app.start()
                .then(function () {
                    app.setRoot('viewmodels/jaystack-example-app');
                });
        });
});
