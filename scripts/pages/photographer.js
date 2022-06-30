let selectInputPopularity = document.getElementById('opt1');
let selectInputDate = document.getElementById('opt2');
let selectLabelPopularity = document.querySelector('[for="opt1"]');
let selectLabelDate = document.querySelector('[for="opt2"]');
let selectLabelTitle = document.querySelector('[for="opt3"]');
let selectDiv = document.getElementsByClassName('select')[0];

setBorderRadiusForSelectedElement(selectLabelPopularity);

function setBorderRadiusForSelectedElement(element) {
    element.style.borderRadius = '5px 5px 5px 5px';
}

function setBorderRadiusForFirstSelect(element) {
    element.style.borderRadius = '5px 5px 0px 0px';
}

function setBorderRadiusForMiddleSelect(element) {
    element.style.borderRadius = '0px 0px 0px 0px';
}

function setBorderRadiusForLastSelect(element) {
    element.style.borderRadius = '0px 0px 5px 5px';
}

function displayWhiteStrip(element) {
    element.style.setProperty('--test', 'block');
}

function hideWhiteStrip(element) {
    element.style.setProperty('--test', 'none');
}

selectDiv.addEventListener('focusout', function () {
    setBorderRadiusForSelectedElement(selectLabelPopularity);
    setBorderRadiusForSelectedElement(selectLabelDate);
    setBorderRadiusForSelectedElement(selectLabelTitle);
})

selectDiv.addEventListener('focus', function () {
    if (selectInputPopularity.checked) {
        setBorderRadiusForFirstSelect(selectLabelPopularity);
        setBorderRadiusForMiddleSelect(selectLabelDate);
        setBorderRadiusForLastSelect(selectLabelTitle);

        displayWhiteStrip(selectLabelPopularity);
        displayWhiteStrip(selectLabelDate);
        hideWhiteStrip(selectLabelTitle);

    } else if (selectInputDate.checked) {
        setBorderRadiusForFirstSelect(selectLabelDate);
        setBorderRadiusForMiddleSelect(selectLabelPopularity);
        setBorderRadiusForLastSelect(selectLabelTitle);

        displayWhiteStrip(selectLabelDate);
        displayWhiteStrip(selectLabelPopularity);
        hideWhiteStrip(selectLabelTitle);

    } else {
        setBorderRadiusForFirstSelect(selectLabelTitle);
        setBorderRadiusForMiddleSelect(selectLabelPopularity);
        setBorderRadiusForLastSelect(selectLabelDate);

        displayWhiteStrip(selectLabelTitle);
        displayWhiteStrip(selectLabelPopularity);
        hideWhiteStrip(selectLabelDate);
    }
})


const getDataPhotographer = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    fetch('data/photographers.json', myInit)
        .then(function (response) {
            if (!response.ok) {
                return console.log('error');
            }

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.indexOf("application/json") === -1) {
                return console.log("Oops, nous n'avons pas du JSON!");
            }

            response.json().then(function (json) {
                let params = new URLSearchParams(document.location.search);
                let photographerId = parseInt(params.get("id"))

                let photographerPersonalData = json.photographers.find(photographer => photographer.id === photographerId);
                let photographerMediaData = [];
                json.media.map(function(element) {
                    if(element.photographerId === photographerId) {
                        photographerMediaData.push(element);
                    }
                })

                return displayPhotographerPageData(photographerPersonalData, photographerMediaData);

            });

        })
        .catch(function (error) {
            console.log(error);
        })
}

function displayPhotographerPageData(photographerPersonalData, photographerMediaData) {
    mediaFactory(photographerPersonalData, photographerMediaData);
    photographerHeaderFactory(photographerPersonalData);
}

getDataPhotographer();
