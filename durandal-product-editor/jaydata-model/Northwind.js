(function(mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports, require("jaydata/core")); // CommonJS
    if (typeof define == "function" && define.amd) return define(["exports", "jaydata/core"], mod); // AMD
    mod($data.generatedContext || ($data.generatedContext = {}), $data); // Plain browser env
})(function(exports, $data) {

    exports.$data = $data;

    var types = {};

    types["Northwind.Product"] = $data("$data.Entity").extend("Northwind.Product", {
        QuantityPerUnit: {
            "type": "Edm.String",
            "nullable": false,
            "required": true
        },
        UnitPrice: {
            "type": "Edm.Decimal",
            "nullable": false,
            "required": true
        },
        _id: {
            "type": "Edm.String",
            "nullable": false,
            "key": true,
            "computed": true
        },
        Name: {
            "type": "Edm.String",
            "nullable": false,
            "required": true
        },
        CategoryId: {
            "type": "Edm.String",
            "nullable": false,
            "required": true
        }
    });

    types["Northwind.Category"] = $data("$data.Entity").extend("Northwind.Category", {
        Description: {
            "type": "Edm.String",
            "nullable": false,
            "required": true
        },
        _id: {
            "type": "Edm.String",
            "nullable": false,
            "key": true,
            "computed": true
        },
        Name: {
            "type": "Edm.String",
            "nullable": false,
            "required": true
        },
        Products: {
            "type": "Array",
            "elementType": "Northwind.Product",
            "inverseProperty": "Category"
        }
    });

    exports.type = types["Northwind.NorthwindContext"] = $data("$data.EntityContext").extend("Northwind.NorthwindContext", {
        Products: {
            "type": "$data.EntitySet",
            "elementType": "Northwind.Product"
        },
        Categories: {
            "type": "$data.EntitySet",
            "elementType": "Northwind.Category"
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
        "NorthwindContext": types["Northwind.NorthwindContext"]
    };

    var ctxType = exports.type;
    exports.factory = function(config) {
        if (ctxType) {
            var cfg = $data.typeSystem.extend({
                name: "oData",
                oDataServiceHost: "http://localhost:3000/odata",
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
        Reflect.defineMetadata("Org.OData.Core.V1.Computed", "true", types["Northwind.Category"].prototype, "_id")
        Reflect.defineMetadata("UI.DisplayName", "Category identifier", types["Northwind.Category"].prototype, "_id")
        Reflect.defineMetadata("UI.ControlHint", "ReadOnly", types["Northwind.Category"].prototype, "_id")
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