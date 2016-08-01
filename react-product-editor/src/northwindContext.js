const oProviderConfig = {
    name: 'oData',
    oDataServiceHost: 'http://localhost:3000/odata'
};

const NorthwindContext = $data('JayStack.NorthwindContext');
const northwindContext = new NorthwindContext(oProviderConfig);

export default northwindContext;