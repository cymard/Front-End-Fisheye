const selectInputPopularity = document.getElementById('opt1')
const selectInputDate = document.getElementById('opt2')
const selectLabelPopularity = document.querySelector('[for="opt1"]')
const selectLabelDate = document.querySelector('[for="opt2"]')
const selectLabelTitle = document.querySelector('[for="opt3"]')
const selectDiv = document.getElementsByClassName('select')[0]

setBorderRadiusForSelectedElement(selectLabelPopularity)

function setBorderRadiusForSelectedElement (element) {
  element.style.borderRadius = '5px 5px 5px 5px'
}

function setBorderRadiusForFirstSelect (element) {
  element.style.borderRadius = '5px 5px 0px 0px'
}

function setBorderRadiusForMiddleSelect (element) {
  element.style.borderRadius = '0px 0px 0px 0px'
}

function setBorderRadiusForLastSelect (element) {
  element.style.borderRadius = '0px 0px 5px 5px'
}

function displayWhiteStrip (element) {
  element.style.setProperty('--test', 'block')
}

function hideWhiteStrip (element) {
  element.style.setProperty('--test', 'none')
}

selectDiv.addEventListener('focusout', function () {
  setBorderRadiusForSelectedElement(selectLabelPopularity)
  setBorderRadiusForSelectedElement(selectLabelDate)
  setBorderRadiusForSelectedElement(selectLabelTitle)
})

function applyBorderOnOptions () {
  if (selectInputPopularity.checked) {
    setBorderRadiusForFirstSelect(selectLabelPopularity)
    setBorderRadiusForMiddleSelect(selectLabelDate)
    setBorderRadiusForLastSelect(selectLabelTitle)

    displayWhiteStrip(selectLabelPopularity)
    displayWhiteStrip(selectLabelDate)
    hideWhiteStrip(selectLabelTitle)
  } else if (selectInputDate.checked) {
    setBorderRadiusForFirstSelect(selectLabelDate)
    setBorderRadiusForMiddleSelect(selectLabelPopularity)
    setBorderRadiusForLastSelect(selectLabelTitle)

    displayWhiteStrip(selectLabelDate)
    displayWhiteStrip(selectLabelPopularity)
    hideWhiteStrip(selectLabelTitle)
  } else {
    setBorderRadiusForFirstSelect(selectLabelTitle)
    setBorderRadiusForMiddleSelect(selectLabelPopularity)
    setBorderRadiusForLastSelect(selectLabelDate)

    displayWhiteStrip(selectLabelTitle)
    displayWhiteStrip(selectLabelPopularity)
    hideWhiteStrip(selectLabelDate)
  }
}

selectDiv.addEventListener('focus', function () {
  applyBorderOnOptions()
})

function openSortBySelect () {
  selectLabelPopularity.classList.add('focusedOption')
  selectLabelDate.classList.add('focusedOption')
  selectLabelTitle.classList.add('focusedOption')
}

function closeSortBySelect () {
  selectLabelPopularity.classList.remove('focusedOption')
  selectLabelDate.classList.remove('focusedOption')
  selectLabelTitle.classList.remove('focusedOption')
}

setArrowDirectionUp()
function setArrowDirectionUp () {
  const inputCheckedLabel = document.querySelector('.select input:checked + label')
  inputCheckedLabel.classList.add('setArrowDirectionUp')
  inputCheckedLabel.classList.remove('setArrowDirectionDown')
}

function setArrowDirectionDown () {
  const inputCheckedLabel = document.querySelector('.select input:checked + label')
  inputCheckedLabel.classList.add('setArrowDirectionDown')
  inputCheckedLabel.classList.remove('setArrowDirectionUp')
}

// focus
selectDiv.addEventListener('focus', () => {
  openSortBySelect()
  applyBorderOnOptions()
  setArrowDirectionDown()
})

selectLabelPopularity.addEventListener('focus', () => {
  openSortBySelect()
  applyBorderOnOptions()
  setArrowDirectionDown()
})

selectLabelDate.addEventListener('focus', () => {
  openSortBySelect()
  applyBorderOnOptions()
  setArrowDirectionDown()
})

selectLabelTitle.addEventListener('focus', () => {
  openSortBySelect()
  applyBorderOnOptions()
  setArrowDirectionDown()
})

// focusout
selectDiv.addEventListener('focusout', () => {
  closeSortBySelect()
  setArrowDirectionUp()
})

selectLabelPopularity.addEventListener('focusout', () => {
  closeSortBySelect()
  setArrowDirectionUp()
})

selectLabelDate.addEventListener('focusout', () => {
  closeSortBySelect()
  setArrowDirectionUp()
})

selectLabelTitle.addEventListener('focusout', () => {
  closeSortBySelect()
  setArrowDirectionUp()
})

// sortBy click
selectLabelPopularity.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    selectLabelPopularity.click()
  }
})

selectLabelDate.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    selectLabelDate.click()
  }
})

selectLabelTitle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    selectLabelTitle.click()
  }
})

const getDataPhotographer = async () => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
  }

  fetch('data/photographers.json', myInit)
    .then(function (response) {
      if (!response.ok) {
        return console.log('error')
      }

      const contentType = response.headers.get('content-type')

      if (contentType && contentType.indexOf('application/json') === -1) {
        return console.log("Oops, nous n'avons pas du JSON!")
      }

      response.json().then((data) => {
        // récupérer l'id du photographe dans l'url
        const params = new URLSearchParams(document.location.search)
        const photographerId = parseInt(params.get('id'))

        // récupérer les données du photographe en fonction de l'id du photographe
        const photographerData = data.photographers.find(photographer => photographer.id === photographerId)
        const photographerMediaData = []

        // récuperer les médias en fonction de l'id du photographe
        data.media.map(function (element) {
          if (element.photographerId === photographerId) {
            photographerMediaData.push(element)
          }
          return ''
        })

        displayPhotographerPageData(photographerData, photographerMediaData)
      })
    })
    .catch(function (error) {
      console.log(error)
    })
}

function displayPhotographerPageData (photographerData, photographerMediaData) {
  // Remplir le header avec les données du photographe
  const photographerModel = photographerFactory(photographerData)
  photographerModel.setPhotographerHeader()
  photographerModel.displayPricePerDay()
  photographerModel.updateModalWithPhotographerName()

  // Media
  const medias = mediasFactory(photographerMediaData, photographerData.name)
  medias.createMedias()
  medias.displaySumOfAllLikes()
  medias.lightbox(true)
  medias.activeMediasSorting()
  medias.displayMediasPer3()
}

getDataPhotographer()
