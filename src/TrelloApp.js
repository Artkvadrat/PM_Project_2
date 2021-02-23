import AuthUI from "./AuthUI";
import CardsUI from "./CardsUI";

export default class TrelloApp {
    static init() {
        AuthUI.render();
        CardsUI.init();
        CardsUI.registerListeners();
        AuthUI.registerListeners();
    }
}
