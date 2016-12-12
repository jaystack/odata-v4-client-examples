define(function (require) {
    var Northwind = require('jaydata-model/Northwind').Northwind,
        ko = require('knockout');

    var context = null;
    var isInit = ko.observable();

    var config = {
        provider: 'oData',
        oDataServiceHost: "http://odata-v4-demo.jaystack.net/api"
    };

    function getContext() {
        return context;
    }

    function init() {
        new Northwind.Default(config)
            .onReady()
            .then(function (ctx) {
                context = ctx;
                isInit(true);
            });

        return isInit;
    }

    return {
        getContext: getContext,
        init: init,
        Category: Northwind.Category,
        Product: Northwind.Product
    }
});
