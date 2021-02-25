import CardsService from "./CardsService";
import User from "./User";
import emitter from './EventEmitter';
import ChangeCardModal from "./modals/changeCardModal";

class CardsUI {

    constructor() {
        this.cardsContainer = document.getElementsByClassName('wrapper')[0];
        this.addCardForm = document.getElementById('addCardForm');

        this.btn = document.querySelectorAll('.add-card')
        this.closeBtn = document.getElementsByClassName('close')[2]

        this.init = this.init.bind(this);
        this.registerListeners = this.registerListeners.bind(this);
        this.addCard = this.addCard.bind(this);
        this.getCards = this.getCards.bind(this);
        this.createCard = this.createCard.bind(this);
    }

    addCard(e) {
        e.preventDefault();

        console.log(" Title " + e.target.elements.newCardTitle.value)
        return CardsService.createCard({
            title: e.target.elements.newCardTitle.value,
            status: e.target.getAttribute('data-attribute'),
            description: e.target.elements.newCardDescription.value
        })
            .then(res => {
                console.log("Response " + JSON.stringify(res))
                return res
            })
            .then(this.getCards)
            .catch(console.log)
    }

    getCards() {
        return CardsService.getCards().then((cards) => {
            console.log("cards " + JSON.stringify(cards))
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
                ChangeCardModal.show(id, title, description, this.updateCard, e.path[2])
            });

        }

        editButton.addEventListener('click', showChangeModal);

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
        this.btn.forEach(element => element.addEventListener('click', this.btnAddClick))
        this.closeBtn.addEventListener('click', this.closeClick)
    }

    // showCardModal(section) {
    //
    // }

    btnAddClick(e) {
        e.preventDefault();

        const attr = e.target.getAttribute("data-attribute")
        document.getElementById('addCardForm').setAttribute("data-attribute", attr)

        this.createCardModal = document.getElementById('modal');
        this.createCardModal.classList.remove('hide');
    }

    closeClick(e) {
        e.preventDefault();
        this.createCardModal = document.getElementById('modal');
        this.createCardModal.classList.add('hide');
    }

}

export default new CardsUI();
