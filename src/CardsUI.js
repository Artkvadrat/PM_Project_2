import CardsService from "./CardsService";
import User from "./User";
import emitter from './EventEmitter';
import ChangeCardModal from "./modals/changeCardModal";

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

    deleteCard(id) {
        return CardsService.deleteCard(id).catch(console.log);
    }

    updateCard(card) {
        return CardsService.updateCard(card).catch(console.log);
    }

    createCard({title, description, status, id}) {
        console.log('Create card')
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardButton = document.createElement('button');
        cardButton.classList.add('card_menu');
        const cardImgDots = document.createElement('img');
        cardImgDots.src = './menu.f5c051c5.png';
        cardImgDots.alt = 'Menu button';
        cardButton.append(cardImgDots);
        cardElement.append(cardButton);

        const cardTitle = document.createElement('h3');
        cardTitle.innerText = title;
        cardElement.append(cardTitle);

        if (description) {
            const cardDescription = document.createElement('p');
            cardDescription.innerHTML = description;
            cardElement.append(cardDescription);
        }

        const changeHandler = () => {
            ChangeCardModal.show(id, title, description)
        }

        cardButton.addEventListener('click', changeHandler);

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

        this.addCardForm.addEventListener('submit', this.addCard);
    }
}

export default new CardsUI();