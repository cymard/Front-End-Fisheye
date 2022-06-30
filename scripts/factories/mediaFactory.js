function mediaFactory (photographerPersonalData, photographerMediaData) {
    let imagesDirPath = photographerPersonalData.name;
    photographerMediaData.map(media => createFigureForMedia(media));

    let priceELement = document.querySelector('#text_info_likes span:nth-of-type(2)');
    displayPricePerDay(priceELement);

    let allLikesElement = document.querySelector('#text_info_likes span:nth-of-type(1) span:nth-of-type(1)');
    displaySumOfAllLikes(allLikesElement);

    let modalTitleElement = document.querySelector('#modal_contact_me span');
    updateModalWithData(modalTitleElement);

    // Adapt rows number
    let rowsNumber = Math.ceil(photographerMediaData.length / 3);
    let divPictures = document.getElementById('pictures');
    divPictures.style.gridTemplateRows = 'repeat('+rowsNumber+', 550px)';

    function createFigureForMedia (media) {
        // create elements
        let figure = document.createElement('figure');

        let link = document.createElement('a');
        link.setAttribute('href', '');
        link.setAttribute('class', 'link_image');

        // display image or video
        if(media.image === undefined) {
            let linkVideo = document.createElement('video');
            linkVideo.setAttribute('width', '250');
            // linkVideo.setAttribute('controls', 'true');

            let linkVideoSource = document.createElement('source');
            linkVideoSource.setAttribute('src', 'assets/images/'+imagesDirPath+'/'+media.video);
            linkVideoSource.setAttribute('type', 'video/mp4');

            link.appendChild(linkVideo);
            linkVideo.appendChild(linkVideoSource)
        } else {
            let linkImg = document.createElement('img');
            linkImg.setAttribute('src', 'assets/images/'+imagesDirPath+'/'+media.image);
            console.log('assets/images/'+imagesDirPath+'/'+media.image);
            link.appendChild(linkImg);
        }

        let figcaption = document.createElement('figcaption');

        let figcaptionPara = document.createElement('p');
        figcaptionPara.textContent += media.title;

        let figcaptionSpan = document.createElement('span');
        figcaptionSpan.textContent += media.likes+' ';

        let figcaptionSpanHeartIcon = document.createElement('i');
        figcaptionSpanHeartIcon.setAttribute('class', 'fa-solid fa-heart');
        figcaptionSpanHeartIcon.setAttribute('aria-label', 'likes');

        // appendChild
        let divPictures = document.getElementById('pictures');
        divPictures.appendChild(figure);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        figcaption.appendChild(figcaptionPara);
        figcaption.appendChild(figcaptionSpan);
        figcaptionSpan.appendChild(figcaptionSpanHeartIcon);
    }

    function displayPricePerDay (priceElement) {
        priceElement.innerText = photographerPersonalData.price+'€ /jour';
    }

    function displaySumOfAllLikes (allLikesElement) {
        let likes = 0;
        photographerMediaData.map(media => likes += media.likes);
        allLikesElement.innerText = likes;

    }

    function updateModalWithData (modalTitleElement) {
        modalTitleElement.innerText = photographerPersonalData.name;
    }
}
