import AuthUI from "./AuthUI";

export default class TrelloApp {
    static init() {
        AuthUI.registerListeners();
    }
}