class CartItem{
    constructor(quantity, productPrice, productTitle, total, imgLink, type){
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.total = total;
        this.imgLink = imgLink;
        this.type = type;
    }
}

export default CartItem;