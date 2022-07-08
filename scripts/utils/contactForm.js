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

    let firstName = document.getElementById('firstname');
    let lastName = document.getElementById('lastname');
    let email = document.getElementById('email');
    let yourMessage = document.getElementById('your_message');

    console.log({
        'firstName' : firstName.value,
        'lastName' : lastName.value,
        'email' : email.value,
        'yourMessage' : yourMessage.value
    });
})