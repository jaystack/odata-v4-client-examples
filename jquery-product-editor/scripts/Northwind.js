(function(mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports, require("jaydata/core")); // CommonJS
    if (typeof define == "function" && define.amd) return define(["exports", "jaydata/core"], mod); // AMD
    mod($data.generatedContext || ($data.generatedContext = {}), $data); // Plain browser env
})(function(exports, $data) {

    exports.$data = $data;

    var types = {};

    types["Northwind.Product"] = $data("$data.Entity").extend("Northwind.Product", {
        _id: {
            "type": "Edm.String",
            "key": true,
            "computed": true
        },
        CategoryId: {
            "type": "Edm.String",
            "nullable": false,
            "required": true
        },
        Discontinued: {
            "type": "Edm.Boolean"
        },
        Name: {
            "type": "Edm.String"
        },
        QuantityPerUnit: {
            "type": "Edm.String"
        },
        UnitPrice: {
            "type": "Edm.Decimal"
        },
        getUnitPrice: {
            "type": "$data.ServiceFunction",
            "namespace": "Northwind",
            "returnType": "Edm.Decimal",
            "params": []
        },
        Category: {
            "type": "Northwind.Category",
            "inverseProperty": "Products"
        },
        invertDiscontinued: {
            "type": "$data.ServiceAction",
            "namespace": "Northwind",
            "returnType": null,
            "params": []
        },
        setDiscontinued: {
            "type": "$data.ServiceAction",
            "namespace": "Northwind",
            "returnType": null,
            "params": [{
                "name": "value",
                "type": "Edm.Boolean"
            }]
        }
    });

    types["Northwind.Category"] = $data("$data.Entity").extend("Northwind.Category", {
        _id: {
            "type": "Edm.String",
            "key": true,
            "computed": true
        },
        Description: {
            "type": "Edm.String"
        },
        Name: {
            "type": "Edm.String"
        },
        Products: {
            "type": "Array",
            "elementType": "Northwind.Product",
            "inverseProperty": "Category"
        }
    });

    exports.type = types["Northwind.Default"] = $data("$data.EntityContext").extend("Northwind.Default", {
        Categories: {
            "type": "$data.EntitySet",
            "elementType": "Northwind.Category"
        },
        Products: {
            "type": "$data.EntitySet",
            "elementType": "Northwind.Product",
            "actions": {
                "swapPrice": {
                    "type": "$data.ServiceAction",
                    "namespace": "Northwind",
                    "returnType": null,
                    "params": [{
                        "name": "b",
                        "type": "Edm.String"
                    }, {
                        "name": "a",
                        "type": "Edm.String"
                    }]
                },
                "discountProduct": {
                    "type": "$data.ServiceAction",
                    "namespace": "Northwind",
                    "returnType": null,
                    "params": [{
                        "name": "percent",
                        "type": "Edm.Int32"
                    }, {
                        "name": "productId",
                        "type": "Edm.String"
                    }]
                },
                "getCheapest": {
                    "type": "$data.ServiceFunction",
                    "namespace": "Northwind",
                    "returnType": "Northwind.Product",
                    "params": []
                },
                "getInPriceRange": {
                    "type": "$data.ServiceFunction",
                    "namespace": "Northwind",
                    "returnType": "$data.Queryable",
                    "params": [{
                        "name": "max",
                        "type": "Edm.Decimal"
                    }, {
                        "name": "min",
                        "type": "Edm.Decimal"
                    }],
                    "elementType": "Northwind.Product"
                }
            }
        },
        initDb: {
            "type": "$data.ServiceAction",
            "returnType": null,
            "params": []
        }
    });

    exports.Northwind = {
        "Product": types["Northwind.Product"],
        "Category": types["Northwind.Category"],
        "Default": types["Northwind.Default"]
    };

    var ctxType = exports.type;
    exports.factory = function(config) {
        if (ctxType) {
            var cfg = $data.typeSystem.extend({
                name: "oData",
                oDataServiceHost: "http://odata-v4-demo.jaystack.net/",
                withCredentials: false,
                maxDataServiceVersion: "4.0"
            }, config);
            return new ctxType(cfg);
        } else {
            return null;
        }
    };

    if (typeof Reflect !== "undefined" && typeof Reflect.defineMetadata === "function") {
        Reflect.defineMetadata("Org.OData.Core.V1.Computed", "true", types["Northwind.Product"].prototype, "_id")
        Reflect.defineMetadata("UI.DisplayName", "Product identifier", types["Northwind.Product"].prototype, "_id")
        Reflect.defineMetadata("UI.ControlHint", "ReadOnly", types["Northwind.Product"].prototype, "_id")
        Reflect.defineMetadata("UI.DisplayName", "Product title", types["Northwind.Product"].prototype, "Name")
        Reflect.defineMetadata("UI.ControlHint", "ShortText", types["Northwind.Product"].prototype, "Name")
        Reflect.defineMetadata("UI.DisplayName", "Product English name", types["Northwind.Product"].prototype, "QuantityPerUnit")
        Reflect.defineMetadata("UI.ControlHint", "ShortText", types["Northwind.Product"].prototype, "QuantityPerUnit")
        Reflect.defineMetadata("UI.DisplayName", "Unit price of product", types["Northwind.Product"].prototype, "UnitPrice")
        Reflect.defineMetadata("UI.ControlHint", "Decimal", types["Northwind.Product"].prototype, "UnitPrice")
        Reflect.defineMetadata("UI.DisplayName", "Products", types["Northwind.Product"].prototype)
        Reflect.defineMetadata("Org.OData.Core.V1.Computed", "true", types["Northwind.Category"].prototype, "_id")
        Reflect.defineMetadata("UI.DisplayName", "Category identifier", types["Northwind.Category"].prototype, "_id")
        Reflect.defineMetadata("UI.ControlHint", "ReadOnly", types["Northwind.Category"].prototype, "_id")
        Reflect.defineMetadata("UI.DisplayName", "Category name", types["Northwind.Category"].prototype, "Name")
        Reflect.defineMetadata("UI.ControlHint", "ShortText", types["Northwind.Category"].prototype, "Name")
        Reflect.defineMetadata("UI.DisplayName", "Categories", types["Northwind.Category"].prototype)
    }

});