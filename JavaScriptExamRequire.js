const SaleItem = require('./JavaScriptExamModuleOne');
const SaleOrder = require('./JavaScriptExamModuleTwo');

let saleitem1 = new SaleItem('Widget','10','2.50');
console.log(saleitem1.itemvalue());

let saleitem2 = new SaleItem('Gidget','20','1.00');
console.log(saleitem2.itemvalue());

let saleorder = new SaleOrder('Customer A','0.1');
saleorder.addItems(saleitem1);
saleorder.addItems(saleitem2);

console.log(saleorder.totalValue());
console.log(saleorder.saleValue());





