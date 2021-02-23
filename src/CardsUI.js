import CardsService from "./CardsService";
import User from "./User";
import emitter from './EventEmitter';

class CardsUI {

    constructor() {
        this.cardsContainer = document.getElementsByClassName('wrapper')[0];
        this.addCardForm = document.getElementById('addCard');
        this.cardTitleInput = document.getElementById('cardTitle');
        this.cardDescriptionInput = document.getElementById('cardDescription');

        this.init = this.init.bind(this);
        this.registerListeners = this.registerListeners.bind(this);
        this.addCard = this.addCard.bind(this);
        this.getCards = this.getCards.bind(this);
    }

    addCard(e) {
        e.preventDefault();

        return CardsService.createCard({
            title: this.cardTitleInput.value,
            status: 'to_do',
            description: 'Lorem ipsun'
        })
            .then(this.getCards)
            .catch(console.log)
    }

    getCards() {
        return CardsService.getCards().then((card) => {
            console.log(card);
        });
    }

    init() {
        if (User.jwtToken) {
            this.cardsContainer.style.display = 'block';
        } else {
            this.cardsContainer.style.display = 'none';
        }
    }

    registerListeners() {
        emitter.subscribe('loggedIn', this.init);

        this.addCardForm.addEventListener('submit', this.addCard);
    }
}

export default new CardsUI();