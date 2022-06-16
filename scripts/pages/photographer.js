//Mettre le code JavaScript lié à la page photographer.html
let selectInputPopularity = document.getElementById('opt1');
let selectInputDate = document.getElementById('opt2');
let selectInputTitle = document.getElementById('opt3');

let selectLabelPopularity = document.querySelector('[for="opt1"]');
let selectLabelDate = document.querySelector('[for="opt2"]');
let selectLabelTitle = document.querySelector('[for="opt3"]');

let selectDiv = document.getElementsByClassName('select')[0];

let activatedBorderRadiusValue = '5px';

function setBorderRadiusForFirstSelect(element) {
    element.style.borderTopRightRadius = activatedBorderRadiusValue;
    element.style.borderTopLeftRadius = activatedBorderRadiusValue;
    element.style.borderBottomLeftRadius = '0px';
    element.style.borderBottomRightRadius = '0px';
}

function setBorderRadiusForMiddleSelect(element) {
    element.style.borderTopRightRadius = '0px';
    element.style.borderTopLeftRadius = '0px';
    element.style.borderBottomLeftRadius = '0px';
    element.style.borderBottomRightRadius = '0px';
}

function setBorderRadiusForLastSelect(element) {
    element.style.borderTopRightRadius = '0px';
    element.style.borderTopLeftRadius = '0px';
    element.style.borderBottomLeftRadius = activatedBorderRadiusValue;
    element.style.borderBottomRightRadius = activatedBorderRadiusValue;

}

selectDiv.addEventListener('click', function() {
    if(selectInputPopularity.checked) {
        console.log('pop')
        // console.log('popularity est selectionné');
        setBorderRadiusForFirstSelect(selectLabelPopularity);
        setBorderRadiusForMiddleSelect(selectLabelDate);
        setBorderRadiusForLastSelect(selectLabelTitle);

    }else if(selectInputDate.checked) {
        console.log('date')
        // console.log('date est selectionné');
        setBorderRadiusForFirstSelect(selectLabelDate);
        setBorderRadiusForMiddleSelect(selectLabelPopularity);
        setBorderRadiusForLastSelect(selectLabelTitle);

    }else {
        console.log('titre');
        setBorderRadiusForFirstSelect(selectLabelTitle);
        setBorderRadiusForMiddleSelect(selectLabelPopularity);
        setBorderRadiusForLastSelect(selectLabelDate);
    }
})

