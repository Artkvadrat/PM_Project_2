import CardsService from "./CardsService";
import User from "./User";

class CardsUI {


    init() {
        if (User.jwtToken) {
            console.log('authorised')
        } else {
            console.log('unauthorised')
        }
    }
}

export default new CardsUI();