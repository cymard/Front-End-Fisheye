const getPhotographers = async () => {

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
                displayData(json.photographers);
                console.log(json);
            });

        })
        .catch(function (error) {
            console.log(error);
        })
}

const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer); // photographer identity
        const userCardDOM = photographerModel.getUserCardDOM(); // create article
        photographersSection.appendChild(userCardDOM); // append article in photographer section
    });
};

getPhotographers();
