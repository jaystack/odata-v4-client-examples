(function(mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports, require("jaydata/core")); // CommonJS
    if (typeof define == "function" && define.amd) return define(["exports", "jaydata/core"], mod); // AMD
    mod($data.generatedContext || ($data.generatedContext = {}), $data); // Plain browser env
})(function(exports, $data) {

    var types = {};

    types["Northwind.Product"] = $data("$data.Entity").extend("Northwind.Product", {
        QuantityPerUnit: {
            "type": "Edm.String"
        },
        UnitPrice: {
            "type": "Edm.Int32",
            "nullable": false,
            "required": true
        },
        CategoryId: {
            "type": "Edm.Int32",
            "nullable": false,
            "required": true
        },
        Discontinued: {
            "type": "Edm.Boolean",
            "nullable": false,
            "required": true
        },
        Id: {
            "type": "Edm.Int32",
            "nullable": false,
            "key": true,
            "computed": true
        },
        Name: {
            "type": "Edm.String"
        },
        Category: {
            "type": "Northwind.Category",
            "inverseProperty": "Products"
        }
    });

    types["Northwind.Category"] = $data("$data.Entity").extend("Northwind.Category", {
        Description: {
            "type": "Edm.String"
        },
        Id: {
            "type": "Edm.Int32",
            "nullable": false,
            "key": true,
            "computed": true
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

    types["Northwind.TestItemGuid"] = $data("$data.Entity").extend("Northwind.TestItemGuid", {
        Id: {
            "type": "Edm.Guid",
            "nullable": false,
            "required": true,
            "key": true
        },
        i0: {
            "type": "Edm.Int32"
        },
        b0: {
            "type": "Edm.Boolean"
        },
        s0: {
            "type": "Edm.String"
        },
        time: {
            "type": "Edm.TimeOfDay",
            "nullable": false,
            "required": true
        },
        date: {
            "type": "Edm.Date",
            "nullable": false,
            "required": true
        },
        t: {
            "type": "Edm.DateTimeOffset",
            "nullable": false,
            "required": true
        },
        dur: {
            "type": "Edm.Duration",
            "nullable": false,
            "required": true
        },
        dtOffset: {
            "type": "Edm.DateTimeOffset",
            "nullable": false,
            "required": true
        },
        lng: {
            "type": "Edm.Int64",
            "nullable": false,
            "required": true
        },
        dec: {
            "type": "Edm.Decimal",
            "nullable": false,
            "required": true
        },
        flt: {
            "type": "Edm.Single",
            "nullable": false,
            "required": true
        },
        emails: {
            "type": "Array",
            "elementType": "Edm.String"
        },
        Group: {
            "type": "Northwind.TestItemGroup",
            "inverseProperty": "$$unbound"
        },
        GetDisplayText: {
            "type": "$data.ServiceAction",
            "namespace": "JayStack",
            "returnType": "Edm.String",
            "params": []
        },
        Concatenate: {
            "type": "$data.ServiceAction",
            "namespace": "JayStack",
            "returnType": "Edm.String",
            "params": [{
                "name": "values",
                "type": "Array",
                "elementType": "Edm.String"
            }]
        }
    }, {
        openType: {
            "value": true
        }
    });

    types["Northwind.TestItemGroup"] = $data("$data.Entity").extend("Northwind.TestItemGroup", {
        Id: {
            "type": "Edm.Guid",
            "nullable": false,
            "required": true,
            "key": true
        },
        Name: {
            "type": "Edm.String"
        },
        Items: {
            "type": "Array",
            "elementType": "Northwind.TestItemGuid",
            "inverseProperty": "$$unbound"
        }
    });

    exports.type = types["JayStack.NorthwindContext"] = $data("$data.EntityContext").extend("JayStack.NorthwindContext", {
        Products: {
            "type": "$data.EntitySet",
            "elementType": "Northwind.Product"
        },
        Categories: {
            "type": "$data.EntitySet",
            "elementType": "Northwind.Category",
            "actions": {
                "SAction1": {
                    "type": "$data.ServiceAction",
                    "namespace": "JayStack",
                    "returnType": "$data.Queryable",
                    "params": [{
                        "name": "p1",
                        "type": "Edm.Int32"
                    }, {
                        "name": "p2",
                        "type": "Edm.String"
                    }, {
                        "name": "p3",
                        "type": "Array",
                        "elementType": "Edm.String"
                    }],
                    "elementType": "Edm.String"
                },
                "SFunction1": {
                    "type": "$data.ServiceFunction",
                    "namespace": "JayStack",
                    "returnType": "$data.Queryable",
                    "params": [{
                        "name": "p1",
                        "type": "Edm.Int32"
                    }, {
                        "name": "p2",
                        "type": "Edm.String"
                    }, {
                        "name": "p3",
                        "type": "Array",
                        "elementType": "Edm.String"
                    }],
                    "elementType": "Edm.String"
                }
            }
        },
        Delete: {
            "type": "$data.ServiceAction",
            "returnType": null,
            "params": []
        },
        InitDb: {
            "type": "$data.ServiceAction",
            "returnType": null,
            "params": []
        },
        SAction1: {
            "type": "$data.ServiceAction",
            "returnType": "Edm.String",
            "params": [{
                "name": "number",
                "type": "Edm.Int32"
            }]
        },
        SAction2: {
            "type": "$data.ServiceAction",
            "returnType": "$data.Queryable",
            "params": [{
                "name": "count",
                "type": "Edm.Int32"
            }],
            "elementType": "Northwind.Product"
        },
        SFunction1: {
            "type": "$data.ServiceFunction",
            "returnType": "$data.Queryable",
            "params": [{
                "name": "number",
                "type": "Edm.Int32"
            }],
            "elementType": "Edm.String"
        },
        SFunction2: {
            "type": "$data.ServiceFunction",
            "returnType": "Edm.String",
            "params": [{
                "name": "number",
                "type": "Edm.Int32"
            }]
        }
    });

    var ctxType = exports.type;
    exports.factory = function(config) {
        if (ctxType) {
            var cfg = $data.typeSystem.extend({
                name: "oData",
                oDataServiceHost: "http://localhost:9000/odata/",
                withCredentials: false,
                maxDataServiceVersion: "4.0"
            }, config);
            return new ctxType(cfg);
        } else {
            return null;
        }
    };

    if (typeof Reflect !== "undefined" && typeof Reflect.defineMetadata === "function") {
        Reflect.defineMetadata("Org.OData.Core.V1.Computed", "true", types["Northwind.Product"].prototype, "Id")
        Reflect.defineMetadata("UI.DisplayName", "Product identifier", types["Northwind.Product"].prototype, "Id")
        Reflect.defineMetadata("UI.ControlHint", "ReadOnly", types["Northwind.Product"].prototype, "Id")
        Reflect.defineMetadata("Org.OData.Core.V1.Computed", "true", types["Northwind.Category"].prototype, "Id")
        Reflect.defineMetadata("UI.DisplayName", "Category identifier", types["Northwind.Category"].prototype, "Id")
        Reflect.defineMetadata("UI.ControlHint", "ReadOnly", types["Northwind.Category"].prototype, "Id")
        Reflect.defineMetadata("UI.DisplayName", "Categories", types["Northwind.Category"].prototype)
        Reflect.defineMetadata("UI.DisplayName", "Category name", types["Northwind.Category"].prototype, "Name")
        Reflect.defineMetadata("UI.ControlHint", "ShortText", types["Northwind.Category"].prototype, "Name")
        Reflect.defineMetadata("UI.DisplayName", "Products", types["Northwind.Product"].prototype)
        Reflect.defineMetadata("UI.DisplayName", "Product title", types["Northwind.Product"].prototype, "Name")
        Reflect.defineMetadata("UI.ControlHint", "ShortText", types["Northwind.Product"].prototype, "Name")
        Reflect.defineMetadata("UI.DisplayName", "Product English name", types["Northwind.Product"].prototype, "QuantityPerUnit")
        Reflect.defineMetadata("UI.ControlHint", "ShortText", types["Northwind.Product"].prototype, "QuantityPerUnit")
        Reflect.defineMetadata("UI.DisplayName", "Unit price of product", types["Northwind.Product"].prototype, "UnitPrice")
        Reflect.defineMetadata("UI.ControlHint", "Decimal", types["Northwind.Product"].prototype, "UnitPrice")
    }

});