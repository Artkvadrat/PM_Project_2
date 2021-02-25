import CardsService from "./CardsService";
import User from "./User";
import emitter from './EventEmitter';
import ChangeCardModal from "./modals/changeCardModal";
import addCardModal from "./modals/addCardModal";
import DeleteCardModal from "./modals/deleteCardModal";

let statuses = [];

class CardsUI {

    constructor() {
        this.cardsContainer = document.getElementsByClassName('wrapper')[0];

        this.addCardButton = document.querySelectorAll('.add-card')

        this.init = this.init.bind(this);
        this.registerListeners = this.registerListeners.bind(this);
        this.addCard = this.addCard.bind(this);
        this.getCards = this.getCards.bind(this);
        this.createCard = this.createCard.bind(this);

        this.btnAddClick = this.btnAddClick.bind(this)
    }

    addCard(section, e) {
        e.preventDefault();

        console.log(" Title " + e.target.elements.newCardTitle.value)
        return CardsService.createCard({
            title: e.target.elements.newCardTitle.value,
            status: section,
            description: e.target.elements.newCardDescription.value
        })
            .then(res => {
                return res
            })
            .then((data) => {
                this.createCard(data);
            })
            .catch(console.log)
    }

    getCards() {
        return CardsService.getCards().then((cards) => {
            cards.forEach(this.createCard);
        });
    }

    getOneCard(id) {
        return CardsService.getOneCard(id).catch(console.log);
    }

    deleteCard(id) {
        return CardsService.deleteCard(id).catch(console.log);
    }

    updateCard(card) {
        return CardsService.updateCard(card).catch(console.log);
    }

    createCard({title, description, status, id}) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('card_delete');
        const cardImgDelete = document.createElement('img');
        cardImgDelete.src = './delete.0ca3ab0c.png';
        cardImgDelete.alt = 'Delete';
        deleteButton.append(cardImgDelete);
        cardElement.append(deleteButton);

        const editButton = document.createElement('button');
        editButton.classList.add('card_edit');
        const cardImgEdit = document.createElement('img');
        cardImgEdit.src = './edit.4c82a68f.png';
        cardImgEdit.alt = 'Menu button';
        editButton.append(cardImgEdit);
        cardElement.append(editButton);

        const cardTitle = document.createElement('h3');
        cardTitle.innerText = title;
        cardElement.append(cardTitle);

        if (description) {
            const cardDescription = document.createElement('p');
            cardDescription.innerHTML = description;
            cardElement.append(cardDescription);
        }

        const showChangeModal = (e) => {
            this.getOneCard(id).then((data) => {
                const {title, description} = data;
                ChangeCardModal.show(id, title, description, this.updateCard, e.path[2]);
            });

        }

        const showDeleteModal = (e) => {
            DeleteCardModal.show(id, this.deleteCard, e.path[2]);
        }

        editButton.addEventListener('click', showChangeModal);
        deleteButton.addEventListener('click', showDeleteModal);

        document.getElementById(`${status}`).append(cardElement);

        if (statuses.indexOf(status) === -1) {
            statuses.push(status);
        }
    }

    init() {
        if (User.jwtToken) {
            this.cardsContainer.style.display = 'block';
        } else {
            this.cardsContainer.style.display = 'none';
        }
    }

    btnAddClick(e) {
        e.preventDefault();
        const cardModal = document.getElementById('addNewCardModal');
        const section = e.target.getAttribute("data-attribute");
        addCardModal.drawCardModal(cardModal);
        const cardModalForm = document.getElementById('addCardForm');
        cardModalForm.addEventListener("submit", e => this.addCard(section, e));
    }

    clearColumns() {
        statuses.map((item) => {
            document.getElementById(`${item}`).innerHTML = '';
        });
    }

    registerListeners() {
        emitter.subscribe('loggedIn', () => {
            this.init();
            this.getCards();
        });

        emitter.subscribe('unauthorised', () => {
            this.init();
            this.clearColumns();
        });

        this.addCardButton.forEach(element => element.addEventListener('click', this.btnAddClick));
    }
}

export default new CardsUI();
