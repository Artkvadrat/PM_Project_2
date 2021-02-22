const modal = document.getElementsByClassName('modal')[0]
const close = document.getElementsByClassName('close')

function closeModal() {
    if(modal) {
        modal.addEventListener('click', function (e) {
            Array.from(close).forEach(elem => {
            if (elem.contains(e.target)) {
                modal.style.cssText = 'display: none'
            }})
        })
    }
}

closeModal()
