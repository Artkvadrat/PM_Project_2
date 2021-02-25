class DeleteCardModal {

    constructor() {
        this.modal = document.getElementById('deleteCardModal');

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    show(id, deleteCard, element){
        this.modal.style.display = 'block';

        const modal_div = document.createElement('div');
        modal_div.className = 'modal_delete_options';
        const question = document.createElement('h2');
        question.innerText = 'Are you sure you want to delete this task?';

        const yesButton = document.createElement('button');
        const noButton = document.createElement('button');
        yesButton.id = 'delete_yes';
        yesButton.innerText = 'YES';
        noButton.id = 'delete_no';
        noButton.innerText = 'NO';

        modal_div.appendChild(question);
        modal_div.appendChild(yesButton);
        modal_div.appendChild(noButton);
        this.modal.appendChild(modal_div);

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