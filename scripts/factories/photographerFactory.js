function photographerFactory(data) {
    const {name, portrait, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        link.setAttribute("href", '/Front-End-Fisheye/photographer.html?id=' + data.id);
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", 'name')
        const h2 = document.createElement('h2');
        h2.textContent = name

        const paragraphCity = document.createElement('p');
        paragraphCity.textContent = data.city + ', ' + data.country;

        const paragraphTagline = document.createElement('p');
        paragraphTagline.textContent = data.tagline;

        const paragraphPrice = document.createElement('p');
        paragraphPrice.textContent = data.price + '€/jour'

        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(paragraphCity);
        article.appendChild(paragraphTagline);
        article.appendChild(paragraphPrice);
        return (article);
    }

    function setPhotographerHeader() {
        let name = document.querySelector('.photograph-header div:nth-of-type(1) h1');
        name.innerText = data.name;

        let city = document.querySelector('.photograph-header div:nth-of-type(1) p:nth-of-type(1)');
        city.innerText = data.city;

        let slogan = document.querySelector('.photograph-header div:nth-of-type(1) p:nth-of-type(2)');
        slogan.innerText = data.tagline;

        let img = document.querySelector('.photograph-header img');
        img.src = 'assets/photographers/' + data.portrait;
    }

    function displayPricePerDay() {
        let priceElement = document.querySelector('#text_info_likes span:nth-of-type(2)');
        priceElement.innerText = price + '€ /jour';
    }

    function updateModalWithPhotographerName() {
        let modalTitleElement = document.querySelector('#modal_contact_me span');
        modalTitleElement.innerText = name;
    }

    return {name, picture, getUserCardDOM, setPhotographerHeader, displayPricePerDay, updateModalWithPhotographerName}
}