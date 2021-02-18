import HTTPService from "./HTTPService";

export default class CardsService {
    static async getCards() {
        return HTTPService.request({path: '/cards'});
    }

    static async createCard(card) {
        return HTTPService.request({
            path: '/cards',
            method: 'POST',
            body: card,
        });
    }

    static async updateCard(card) {
        return HTTPService.request({
            path: `/cards/${card.id}`,
            method: 'PUT',
            body: card
        });
    }

    static async deleteCard(id) {
        return HTTPService.request({
            path: `cards/${id}`,
            method: 'DELETE'
        })
    }
}