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

