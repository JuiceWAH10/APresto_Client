class CartItem{
    constructor(quantity, productPrice, productTitle, total, imgLink){
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.total = total;
        this.imgLink = imgLink;
    }
}

export default CartItem;