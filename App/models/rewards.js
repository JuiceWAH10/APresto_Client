class Rewards{
    constructor(reward_ID, shop_ID, reward_Name, pointsReq, definition, quantity, status, imgLink){
        this.reward_ID = reward_ID;
        this.shop_ID = shop_ID;
        this.reward_Name = reward_Name;
        this.pointsReq = pointsReq;
        this.definition = definition;
        this.status = status;
        this.imgLink = imgLink;
    }
}

export default Rewards;
//class object for rewards