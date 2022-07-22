function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

let submitBtn = document.getElementsByClassName('contact_button')[1];

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let email = document.getElementById('email');
    let message = document.getElementById('message');

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