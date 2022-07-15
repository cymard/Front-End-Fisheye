function mediasFactory (photographerMediaData, photographerName){

    function activeMediasSorting () {
        const divSortBy = document.getElementsByClassName('select')[0];
        let selectInputPopularity = document.getElementById('opt1');
        let selectInputDate = document.getElementById('opt2');
        let selectInputTitle = document.getElementById('opt3');

        divSortBy.addEventListener('click', (e) => {
            if (e.target.nodeName === 'INPUT') {
                if (selectInputPopularity.checked) {
                    // Trier par popularité
                    photographerMediaData.sort((a, b) => {
                        return a.likes - b.likes
                    })
                }

                if (selectInputDate.checked) {
                    // Trier par date
                    photographerMediaData.sort((a, b) => {
                        const date1 = new Date(a.date);
                        const date2 = new Date(b.date);

                        if(date1 > date2){
                            return 1
                        }

                        if(date1 < date2){
                            return -1
                        }

                        return 0
                    })
                }

                if (selectInputTitle.checked) {
                    // Trier par titre
                    photographerMediaData.sort((a, b) => {
                        return a.title.localeCompare(b.title);
                    })
                }

                cleanAllMedias();
                createMedias(photographerMediaData);
                lightbox(photographerMediaData)
            }

            const sortByValue = document.querySelectorAll('.select label');
            // console.log(sortByValue)
            sortByValue.forEach((element) => {
                // console.log(element.style)
            })
        })
    }

    function cleanAllMedias () {
        let divPictures = document.getElementById('pictures');
        while (divPictures.firstChild) {
            divPictures.removeChild(divPictures.firstChild);
        }
    }

    function createMedias (allMedias) {
        allMedias.forEach((element, index) => {
            const media = mediaFactory(element);
            media.createVisualMedia(index, photographerName)
        });
    }

    function displaySumOfAllLikes () {
        let likes = 0;
        let allLikesElement = document.querySelector('#text_info_likes span:nth-of-type(1) span:nth-of-type(1)');
        photographerMediaData.map(media => likes += media.likes);
        allLikesElement.innerText = likes;
    }

    function lightbox (allMedias) {
        const lightboxElement = document.getElementsByTagName('dialog')[0];
        const mediasLink = document.querySelectorAll('.link_image');
        const lightboxCloseBtn = document.querySelector('i.fa-xmark');
        const leftArrow = document.querySelector('dialog .arrow_previous');
        const rightArrow = document.querySelector('dialog .arrow_next');
        let mediaPosition;

        lightboxCloseBtn.addEventListener('click', function () {
            lightboxElement.style.display = "none";
        })

        mediasLink.forEach(link => {
            console.log(link);
            link.addEventListener('click', function (e) {
                let mediaData = allMedias[link.dataset.id];
                mediaPosition = parseInt(link.dataset.id);

                lightboxElement.style.display = "flex";
                // sélectionner le media correspondant à l'id
                displayMediaInLightbox(mediaData, e.target)
            })
        })

        rightArrow.addEventListener('click', () => {
            mediaPosition+=1;
            if(mediaPosition === mediasLink.length) {
                mediaPosition = 0;
            }
            displayMediaInLightbox(allMedias[mediaPosition], mediasLink[mediaPosition].firstChild)
        })

        leftArrow.addEventListener('click', () => {
            mediaPosition-=1;
            if(mediaPosition === -1) {
                mediaPosition = mediasLink.length-1;
            }
            console.log('click');
            displayMediaInLightbox(allMedias[mediaPosition], mediasLink[mediaPosition].firstChild)
        })

        function displayMediaInLightbox (mediaData, mediaDomElement) {
            // console.log(mediaDomElement)
            if (mediaData.video !== undefined) {
                // video
                replaceLightboxContentToVideo(mediaDomElement.firstChild.src, mediaData, lightboxElement)
                return;
            }
            // image
            replaceLightboxContentToImg(mediaDomElement.src, mediaData, lightboxElement);
        }

        function replaceLightboxContentToImg(imgSrc, mediaData, parentNode) {
            removeLightboxOldContent(parentNode);
            let lightboxParagraph = displayMediaParagraph(mediaData.title);
            // Creer et insérer l'image dans le dom
            let newImage = document.createElement('img');
            newImage.setAttribute('src', imgSrc);
            parentNode.insertBefore(newImage, lightboxParagraph);
        }

        function replaceLightboxContentToVideo(videoSrc, mediaData, parentNode) {
            removeLightboxOldContent(parentNode);
            let lightboxParagraph = displayMediaParagraph(mediaData.title);

            // créer la video
            let video = document.createElement('video');
            video.setAttribute('controls', 'true');

            // créer la source
            let source = document.createElement('source');
            source.setAttribute('src', videoSrc);
            source.setAttribute('type', 'video/mp4');
            video.appendChild(source);

            parentNode.insertBefore(video, lightboxParagraph);
        }

        function removeLightboxOldContent() {
            if (document.querySelector('dialog img') === null) {
                // supprimer une video
                let video = document.querySelector('dialog video:nth-of-type(1)');
                video.remove();
                return;
            }

            // supprimer une image
            let image = document.querySelector('dialog img:nth-of-type(1)');
            image.remove();
        }

        function displayMediaParagraph(mediaParagraph) {
            const lightboxParagraph = document.querySelector('dialog p:nth-of-type(1)');
            lightboxParagraph.innerHTML = mediaParagraph;
            return lightboxParagraph;
        }
    }

    function displayMediasPer3 () {
        // Adapt rows number
        let rowsNumber = Math.ceil(photographerMediaData.length / 3);
        let divPictures = document.getElementById('pictures');
        divPictures.style.gridTemplateRows = 'repeat('+rowsNumber+', 550px)';
    }

    return {createMedias, displaySumOfAllLikes, lightbox, activeMediasSorting, displayMediasPer3}
}