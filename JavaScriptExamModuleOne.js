//Create a module that represents a sales order item.  
//It should have the properties, product, quantity, price and a function to return the value of the item (price * quantity).
//Bingqing He

function SaleItem (product, quantity, price){
    let saleitem = {};
    saleitem.product = product;
    saleitem.quantity = quantity;
    saleitem.price = price;

    saleitem.itemvalue = function(){
        return saleitem.quantity * saleitem.price;
    }

    return saleitem;
}

module.exports = SaleItem;

