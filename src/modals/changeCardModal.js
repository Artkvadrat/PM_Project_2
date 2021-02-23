import CardsService from "../CardsService";

class ChangeCardModal {
    constructor() {
        this.modal = document.getElementById('editModal');

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);

        this.modal.addEventListener('click', this.close);
    }

    show(id) {
        console.log(id);
        this.modal.style.display = 'block';
        this.modal.innerHTML = `
        <div class="editModalInputs">
            <form>
                <label for="editTitleInput">Title</label>
                <input id="editTitleInput" type="text">
                <label for="editDescriptionTextarea">Description</label>
                <textarea name="title" id="editDescriptionTextarea" cols="30" rows="10" maxlength="400"></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>`;

    }

    close() {
        this.modal.style.display = 'none';
        this.modal.innerHTML = '';
    }
}

export default new ChangeCardModal();