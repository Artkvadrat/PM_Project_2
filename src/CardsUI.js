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
        this.createCard = this.createCard.bind(this);
    }

    addCard(e) {
        e.preventDefault();

        return CardsService.createCard({
            title: this.cardTitleInput.value,
            status: 'to_do',
            description: this.cardDescriptionInput
        })
            .then(this.getCards)
            .catch(console.log)
    }

    getCards() {
        console.log('getCards');
        return CardsService.getCards().then((cards) => {
            cards.forEach(this.createCard);
        });
    }

    createCard({title, description, status}) {
        console.log('Create card')
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardTitle = document.createElement('h3');
        cardTitle.innerText = title;
        cardElement.append(cardTitle);

        if (description) {
            const cardDescription = document.createElement('p');
            cardDescription.innerHTML = description;
            cardElement.append(cardDescription);
        }

        document.getElementById(`${status}`).append(cardElement);
    }

    init() {
        if (User.jwtToken) {
            this.cardsContainer.style.display = 'block';
        } else {
            this.cardsContainer.style.display = 'none';
        }
    }

    registerListeners() {
        emitter.subscribe('loggedIn', () => {
            this.init();
            this.getCards();
        });

        if (User.jwtToken) {
            emitter.emit('loggedIn')
        }

        this.addCardForm.addEventListener('submit', this.addCard);
    }
}

export default new CardsUI();