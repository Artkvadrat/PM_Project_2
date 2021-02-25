class DeleteCardModal {

    constructor() {
        this.modal = document.getElementById('modal_delete');

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    show(id, deleteCard, element){
        this.modal.style.display = 'block';

        const question = document.createElement('h2');
        question.innerText = 'Are you sure you want to delete this task?';

        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.id = 'buttons'

        const yesButton = document.createElement('button');
        const noButton = document.createElement('button');
        yesButton.id = 'delete_yes';
        yesButton.innerText = 'YES';
        noButton.id = 'delete_no';
        noButton.innerText = 'NO';

        buttonsWrapper.appendChild(yesButton);
        buttonsWrapper.appendChild(noButton);

        this.modal.appendChild(question);
        this.modal.appendChild(buttonsWrapper);

        const deleteHandler = () => {
            element.remove();

            this.close()

            return deleteCard(id);
        }

        const noDeleteHandler = () => {
            this.close()
        }

        yesButton.addEventListener('click', deleteHandler);
        noButton.addEventListener('click', noDeleteHandler);
    }

    close(){
        this.modal.style.display = 'none';
        this.modal.innerHTML = '';
    }
}

export default new DeleteCardModal();