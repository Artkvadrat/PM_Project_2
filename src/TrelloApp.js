import AuthUI from "./AuthUI";
import CardsUI from "./CardsUI";

export default class TrelloApp {
    static init() {
        AuthUI.registerListeners();
        AuthUI.render();
        CardsUI.init();

    }
}
