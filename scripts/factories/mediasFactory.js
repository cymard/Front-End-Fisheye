function mediasFactory (photographerMediaData, photographerName){
    // console.log(photographerMediaData);
    // console.log(photographerName);
    // donner ça en parametre et le trie est fait
    // const allMediasPopularity = ;
    // const allMediasDate = ;
    // const allMediasTitle = ;

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

    // function displayMediasPer3 () {
    //     // Adapt rows number
    //     let rowsNumber = Math.ceil(photographerMediaData.length / 3);
    //     let divPictures = document.getElementById('pictures');
    //     divPictures.style.gridTemplateRows = 'repeat('+rowsNumber+', 550px)';
    // }

    function lightbox (allMedias) {
        let lightboxElement = document.getElementsByTagName('dialog')[0];
        let imagesLink = document.querySelectorAll('.link_image');
        let lightboxCloseBtn = document.querySelector('i.fa-xmark');

        lightboxCloseBtn.addEventListener('click', function (e) {
            lightboxElement.style.display = "none";
        })

        imagesLink.forEach(link => {
            link.addEventListener('click', function (e) {
                lightboxElement.style.display = "flex";
                // selectionner le media correspondant à l'id
                let mediaData = allMedias[link.dataset.id];

                if (mediaData.video !== undefined) {
                    // video
                    replaceLightboxContentToVideo(e.target.firstChild.src, mediaData, lightboxElement)
                    return;
                }
                // image
                replaceLightboxContentToImg(e.target.src, mediaData, lightboxElement);
            })
        })

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

    return {createMedias, displaySumOfAllLikes, lightbox}
}