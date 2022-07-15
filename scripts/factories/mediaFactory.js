function mediaFactory (mediaData) {

    function createVisualMedia(dataId, photographerName) {
        let figure = document.createElement('figure');

        let link = document.createElement('a');
        link.dataset.id = dataId;
        link.setAttribute('href', '#');
        link.setAttribute('class', 'link_image');

        // display image or video
        if(mediaData.image === undefined) {
            let linkVideo = document.createElement('video');
            linkVideo.setAttribute('width', '250');

            let linkVideoSource = document.createElement('source');
            linkVideoSource.setAttribute('src', 'assets/images/'+photographerName+'/'+mediaData.video);
            linkVideoSource.setAttribute('type', 'video/mp4');

            link.appendChild(linkVideo);
            linkVideo.appendChild(linkVideoSource)
        } else {
            let linkImg = document.createElement('img');
            linkImg.setAttribute('src', 'assets/images/'+photographerName+'/'+mediaData.image);
            // console.log('assets/images/'+photographerName+'/'+media.image);
            link.appendChild(linkImg);
        }

        let figcaption = document.createElement('figcaption');

        let figcaptionPara = document.createElement('p');
        figcaptionPara.textContent += mediaData.title;

        let figcaptionSpan = document.createElement('span');
        figcaptionSpan.textContent += mediaData.likes+' ';

        let figcaptionSpanHeartIcon = document.createElement('i');
        figcaptionSpanHeartIcon.setAttribute('class', 'fa-solid fa-heart');
        figcaptionSpanHeartIcon.setAttribute('aria-label', 'likes');

        // Relier les blocs
        figure.appendChild(link);
        figure.appendChild(figcaption);
        figcaption.appendChild(figcaptionPara);
        figcaption.appendChild(figcaptionSpan);
        figcaptionSpan.appendChild(figcaptionSpanHeartIcon);

        // Lier à la page
        let divPictures = document.getElementById('pictures');
        divPictures.appendChild(figure);
    }

    return {createVisualMedia}
}
