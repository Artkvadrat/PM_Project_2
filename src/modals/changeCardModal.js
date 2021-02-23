class ChangeCardModal {

    constructor() {
        this.modal = document.getElementById('editModal');

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    show(id, title, description, updateCard, element) {

        this.modal.style.display = 'block';

        const formWrapper = document.createElement('div');
        formWrapper.classList.add('editModalInputs');

        const closeModalButton = document.createElement('button');
        closeModalButton.innerHTML = '<img src="./exit.b64db3e8.png" alt="close"/>';
        closeModalButton.addEventListener('click', this.close);
        formWrapper.append(closeModalButton);

        const editModalForm = document.createElement('form');

        const editTitleLabel = document.createElement('label');
        editTitleLabel.htmlFor = 'editTitleInput';
        editTitleLabel.innerText = 'Title';
        editModalForm.append(editTitleLabel);

        const editTitleInput = document.createElement('input');
        editTitleInput.type = 'text';
        editTitleInput.id = 'editTitleInput';
        editTitleInput.value = title;
        editModalForm.append(editTitleInput);

        const editDescriptionLabel = document.createElement('label');
        editDescriptionLabel.htmlFor = 'editDescriptionTextarea';
        editDescriptionLabel.innerText = 'Description';
        editModalForm.append(editDescriptionLabel);

        const editDescriptionTextarea = document.createElement('textarea');
        editDescriptionTextarea.id = 'editDescriptionTextarea';
        editDescriptionTextarea.value = title;
        editDescriptionTextarea.name = 'description';
        editDescriptionTextarea.cols = 30;
        editDescriptionTextarea.rows = 10;
        editDescriptionTextarea.value = description;
        editDescriptionTextarea.maxLength = 400;
        editModalForm.append(editDescriptionTextarea);

        const editFormButton = document.createElement('button');
        editFormButton.innerText = 'Submit';
        editFormButton.type = 'submit';
        editFormButton.disabled = true;
        editModalForm.append(editFormButton);

        formWrapper.append(editModalForm);

        this.modal.append(formWrapper);

        const changeHandler = (e) => {
            e.preventDefault();
            element.getElementsByTagName('h3')[0].innerText = editTitleInput.value;
            element.getElementsByTagName('p')[0].innerText = editDescriptionTextarea.value;

            this.close();
            return updateCard({
                id,
                title: editTitleInput.value,
                description: editDescriptionTextarea.value,
            });
        }

        const enableSubmitButtonOnChange = () => {
            if ((title!== editTitleInput.value && editTitleInput.value) || description !== editDescriptionTextarea.value) {
                editFormButton.disabled = false;
            } else {
                editFormButton.disabled = true;
            }
        }

        editModalForm.addEventListener('submit', changeHandler);
        editTitleInput.addEventListener('input', enableSubmitButtonOnChange);
        editDescriptionTextarea.addEventListener('input', enableSubmitButtonOnChange);


        // this.modal.innerHTML = `
        // <div class="editModalInputs">
        //     <form>
        //         <label for="editTitleInput">Title</label>
        //         <input id="editTitleInput" type="text">
        //         <label for="editDescriptionTextarea">Description</label>
        //         <textarea name="title" id="editDescriptionTextarea" cols="30" rows="10" maxlength="400"></textarea>
        //         <button type="submit">Submit</button>
        //     </form>
        // </div>`;
    }

    close() {
        this.modal.style.display = 'none';
        this.modal.innerHTML = '';
    }
}

export default new ChangeCardModal();