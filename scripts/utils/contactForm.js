const modal = document.getElementById('contact_modal')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const message = document.getElementById('message')
const openModalBtn = document.getElementsByClassName('contact_button')[0]
const submitBtn = document.getElementsByClassName('contact_button')[1]
const closeModalElement = document.querySelector('.modal header img')
const allSelectLabels = document.querySelectorAll('.select .option')
const divSelect = document.getElementsByClassName('select')[0]

function displayModal () {
  modal.style.display = 'flex'
  firstname.tabIndex = 2
  lastname.tabIndex = 2
  email.tabIndex = 2
  message.tabIndex = 2
  submitBtn.tabIndex = 2
  closeModalElement.tabIndex = 2
  divSelect.tabIndex = -1
  allSelectLabels.forEach(element => element.tabIndex = -1)
}

function closeModal () {
  modal.style.display = 'none'
  allSelectLabels.forEach(element => element.tabIndex = 2)
  divSelect.tabIndex = 2
}

closeModalElement.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    closeModalElement.click()
  }
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()

  console.log({
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    message: message.value
  })

  closeModal()
  const modalForm = document.getElementsByClassName('contact_modal_form')[0]
  modalForm.reset()
})

// modal accessibility
document.addEventListener('keydown', function (e) {
  if (modal.style.display === 'flex' && e.key === 'Escape') {
    closeModal()
    openModalBtn.focus()
  }
})
