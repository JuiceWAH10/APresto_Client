class Product{
    constructor(product_ID, shop_ID, product_Name, price, stock, definition, status, imgLink){
        this.product_ID = product_ID;
        this.shop_ID = shop_ID;
        this.product_Name = product_Name;
        this.price = price;
        this.stock = stock;
        this.definition = definition;
        this.status = status;
        this.imgLink = imgLink;
    }
}

export default Product;
//class object for products