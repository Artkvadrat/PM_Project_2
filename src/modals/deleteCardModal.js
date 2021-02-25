class DeleteCardModal {

    constructor() {
        this.modal = document.getElementById('modal_delete');

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    show(id, deleteCard){
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
            this.close()

            return deleteCard({
                id
            })
        }

        const noDeleteHandler = () => {
            this.close()
        }

        yesButton.addEventListener('submit', deleteHandler);
        noButton.addEventListener('submit', noDeleteHandler);
    }

    close(){
        this.modal.style.display = 'none';
        this.modal.innerHTML = '';
    }
}

export default new DeleteCardModal();