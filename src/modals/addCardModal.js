class AddCardModal {
    constructor() {
        this.drawCardModal = this.drawCardModal.bind(this)
    }

    drawCardModal(container) {
        container.innerHTML =
            `<div id="createCardModal">
                <form id="addCardForm">
                    <a class="close" title="close"></a>
                    <label for="newCardTitle">Title</label>
                    <input id="newCardTitle" type="text">
                    <label for="newCardDescription">Description</label>
                    <textarea name="title" id="newCardDescription" cols="30" rows="10" maxlength="400"></textarea>
                    <button type="submit" id="btn-submit" disabled>Submit</button>
                </form>
            </div>`
        container.classList.remove("hide")

        const closeClick = e => {
            e.preventDefault();
            this.createCardModal = document.getElementById('addNewCardModal');
            this.createCardModal.classList.add('hide');
            this.createCardModal.innerHTML = '';
        }

        const submitEnabled = (e) => {
            e.preventDefault();
            const title = document.getElementById('newCardTitle').value
            const description = document.getElementById('newCardDescription').value
            const button = document.getElementById('btn-submit')
            button.disabled = !(title !== '' || description !== '');
        }

        document.getElementById('addCardForm').addEventListener('submit', closeClick)
        document.getElementsByClassName('close')[2].addEventListener("click", closeClick)
        document.getElementById('newCardTitle').addEventListener('input', submitEnabled)
        document.getElementById('newCardDescription').addEventListener('input', submitEnabled)
    }

}

export default new AddCardModal()
