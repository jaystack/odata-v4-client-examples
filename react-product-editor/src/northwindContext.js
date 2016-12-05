const oProviderConfig = {
    name: 'oData',
    oDataServiceHost: 'http://odata-v4-demo.jaystack.net/api'
};

const NorthwindContext = $data('Northwind.Default');
const northwindContext = new NorthwindContext(oProviderConfig);

export default northwindContext;