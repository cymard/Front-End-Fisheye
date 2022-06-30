function photographerHeaderFactory (photographerPersonalData) {
    console.log(photographerPersonalData);
    let name = document.querySelector('.photograph-header div:nth-of-type(1) h1');
    name.innerText = photographerPersonalData.name;

    let city = document.querySelector('.photograph-header div:nth-of-type(1) p:nth-of-type(1)');
    city.innerText = photographerPersonalData.city;

    let slogan = document.querySelector('.photograph-header div:nth-of-type(1) p:nth-of-type(2)');
    slogan.innerText = photographerPersonalData.tagline;

    let img = document.querySelector('.photograph-header img');
    img.src = 'assets/photographers/' + photographerPersonalData.portrait;
}