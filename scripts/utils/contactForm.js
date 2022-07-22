const modal = document.getElementById("contact_modal");
let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let message = document.getElementById('message');

function displayModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

let submitBtn = document.getElementsByClassName('contact_button')[1];

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

document.addEventListener('keydown', function(event)
{
    if(modal.style.display === "flex") {
        firstname.focus();
    }

    if(modal.style.display === "flex" && firstname.focus()) {
        lastname.focus();
    }

})