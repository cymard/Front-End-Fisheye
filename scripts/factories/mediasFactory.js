function mediasFactory(photographerMediaData, photographerName) {
    let allMedias = photographerMediaData;
    let mediaPosition;
    let mediasLink;

    function personalizeSelectTabindex (popularityIndex, dateIndex, titleIndex) {
        let selectLabelPopularity = document.querySelector('[for="opt1"]');
        let selectLabelDate = document.querySelector('[for="opt2"]');
        let selectLabelTitle = document.querySelector('[for="opt3"]');
        selectLabelPopularity.tabIndex = popularityIndex;
        selectLabelDate.tabIndex = dateIndex;
        selectLabelTitle.tabIndex = titleIndex;
    }

    function cleanAndResetSelectArrow () {
        let allLabels = document.querySelectorAll('.select label');
        allLabels.forEach(element => {
            if (element.classList.contains('setArrowDirectionDown')) {
                element.classList.remove('setArrowDirectionDown');
            }

            if (element.classList.contains('setArrowDirectionUp')) {
                element.classList.remove('setArrowDirectionUp');
            }
        })
        document.querySelector('.select input:checked + label').classList.add('setArrowDirectionDown');
        document.getElementsByClassName('select')[0].focus();
    }

    function activeMediasSorting() {
        const divSortBy = document.getElementsByClassName('select')[0];
        let selectInputPopularity = document.getElementById('opt1');
        let selectInputDate = document.getElementById('opt2');
        let selectInputTitle = document.getElementById('opt3');

        divSortBy.addEventListener('click', (e) => {
            cleanAndResetSelectArrow();

            if (e.target.nodeName === 'INPUT') {
                if (selectInputPopularity.checked) {
                    // Trier par popularité
                    allMedias.sort((a, b) => {
                        return a.likes - b.likes
                    })
                    personalizeSelectTabindex(1,2,3);

                }

                if (selectInputDate.checked) {
                    // Trier par date
                    allMedias.sort((a, b) => {
                        const date1 = new Date(a.date);
                        const date2 = new Date(b.date);

                        if (date1 > date2) {
                            return 1
                        }

                        if (date1 < date2) {
                            return -1
                        }

                        return 0
                    })
                    personalizeSelectTabindex(2,1,3);
                }

                if (selectInputTitle.checked) {
                    // Trier par titre
                    allMedias.sort((a, b) => {
                        return a.title.localeCompare(b.title);
                    })
                    personalizeSelectTabindex(2,3,1);
                }

                cleanAllMedias();
                createMedias();
                lightbox(false)
            }
        })
    }

    function cleanAllMedias() {
        let divPictures = document.getElementById('pictures');
        while (divPictures.firstChild) {
            divPictures.removeChild(divPictures.firstChild);
        }
    }

    function createMedias() {
        allMedias.forEach((element, index) => {
            const media = mediaFactory(element);
            media.createVisualMedia(index, photographerName)
        });
    }

    function displaySumOfAllLikes() {
        let likes = 0;
        let allLikesElement = document.querySelector('#text_info_likes span:nth-of-type(1) span:nth-of-type(1)');
        allMedias.map(media => likes += media.likes);
        allLikesElement.innerText = likes;
    }

    function lightbox(isLightboxFirstInstantiation) {
        const lightboxElement = document.getElementsByTagName('dialog')[0];
        mediasLink = document.querySelectorAll('.link_image');
        const lightboxCloseBtn = document.querySelector('i.fa-xmark');
        const leftArrow = document.querySelector('dialog .arrow_previous');
        const rightArrow = document.querySelector('dialog .arrow_next');

        lightboxCloseBtn.addEventListener('click', function () {
            lightboxElement.style.display = "none";
        })

        mediasLink.forEach(link => {
            link.addEventListener('click', function (e) {
                mediaPosition = parseInt(link.dataset.id);
                let mediaData = allMedias[mediaPosition];
                lightboxElement.style.display = "flex";
                // sélectionner le media correspondant à l'id
                displayMediaInLightbox(mediaData, e.target)
            })
        })

        function handleRightArrowClick () {
            mediaPosition += 1;
            if (mediaPosition === mediasLink.length) {
                mediaPosition = 0;
            }
            displayMediaInLightbox()
        }

        function handeLeftArrowClick () {
            mediaPosition -= 1;
            if (mediaPosition === -1) {
                mediaPosition = mediasLink.length - 1;
            }
            displayMediaInLightbox()
        }

        if(isLightboxFirstInstantiation) {
            rightArrow.addEventListener('click', handleRightArrowClick)
            leftArrow.addEventListener('click', handeLeftArrowClick)
        }

        function displayMediaInLightbox() {
            let mediaData = allMedias[mediaPosition];
            let mediaDomElement = mediasLink[mediaPosition].firstChild;

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

        // lightbox accessibility
        document.addEventListener('keydown', function(e)
        {
            if(lightboxElement.style.display === "flex") {
                switch (e.key) {
                    case 'ArrowRight':
                        rightArrow.click();
                        break;
                    case 'ArrowLeft':
                        leftArrow.click();
                        break;
                    case 'Escape':
                        lightboxCloseBtn.click();
                        break;
                }
            }
        })
    }

    function displayMediasPer3() {
        // Adapt rows number
        let rowsNumber = Math.ceil(allMedias.length / 3);
        let divPictures = document.getElementById('pictures');
        divPictures.style.gridTemplateRows = 'repeat(' + rowsNumber + ', 550px)';
    }

    return {createMedias, displaySumOfAllLikes, lightbox, activeMediasSorting, displayMediasPer3}
}