function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute("href", '#')
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", 'name')
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const paragraphCity = document.createElement('p');
        paragraphCity.textContent = data.city+', '+data.country;

        const paragraphTagline = document.createElement('p');
        paragraphTagline.textContent = data.tagline;

        const paragraphPrice = document.createElement('p');
        paragraphPrice.textContent = data.price+'€/jour'

        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(paragraphCity);
        article.appendChild(paragraphTagline);
        article.appendChild(paragraphPrice);
        return (article);
    }

    return { name, picture, getUserCardDOM }
}