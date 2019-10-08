//Create a module that represents a sales order that has the properties customer, sales tax rate and an array of items.
//It should have a function to return the value of the items (sum the item price times quantity) and a function that returns total value (sum of the value of the items plus the sales tax).
//Bingqing He

function SaleOrder(customer, taxrate, saleitems) {
    let saleorder = {};
    saleorder.customer = customer;
    saleorder.taxrate = taxrate;
    saleorder.saleitems = saleitems ? saleitems : [];

    saleorder.addItems = function (saleitem) {
        saleorder.saleitems.push(saleitem);
    }

    saleorder.totalValue = function () {
        let total = 0;
        saleorder.saleitems.forEach(item => {
            total += item.itemvalue();
        });
        return total;
    }

    saleorder.saleValue = function () {
        return saleorder.totalValue() * (saleorder.taxrate) + saleorder.totalValue();
    }

    return saleorder;
}

module.exports = SaleOrder;

