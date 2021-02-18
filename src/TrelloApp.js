import AuthUI from "./AuthUI";
import CardsUI from "./CardsUI";

export default class TrelloApp {
    static init() {
        AuthUI.registerListeners();
        CardsUI.init();
    }
}