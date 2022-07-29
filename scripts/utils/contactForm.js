const modal = document.getElementById("contact_modal");
let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let message = document.getElementById('message');
let openModalBtn = document.getElementsByClassName('contact_button')[0];
let submitBtn = document.getElementsByClassName('contact_button')[1];
let closeModalElement = document.querySelector('.modal header img');
let allSelectLabels = document.querySelectorAll('.select .option');
let divSelect = document.getElementsByClassName('select')[0];

function displayModal() {
    modal.style.display = "flex";
    firstname.tabIndex = 2;
    lastname.tabIndex = 2;
    email.tabIndex = 2;
    message.tabIndex = 2;
    submitBtn.tabIndex = 2;
    closeModalElement.tabIndex = 2;
    divSelect.tabIndex = -1;
    allSelectLabels.forEach(element => element.tabIndex = -1);
}

function closeModal() {
    modal.style.display = "none";
    allSelectLabels.forEach(element => element.tabIndex = 2);
    divSelect.tabIndex = 2;
}

closeModalElement.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        closeModalElement.click()
    }
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log({
        'firstname': firstname.value,
        'lastname': lastname.value,
        'email': email.value,
        'message': message.value
    });

    closeModal();
    let modalForm = document.getElementsByClassName('contact_modal_form')[0];
    modalForm.reset();
})

// modal accessibility
document.addEventListener('keydown', function(e)
{
    if (modal.style.display === "flex" && e.key === 'Escape') {
        closeModal();
        openModalBtn.focus();
    }
})