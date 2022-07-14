// let imagesLink = document.getElementsByClassName('link_image');
// let imagesLink = document.querySelectorAll('.link_image');
// let lightboxImage = document.querySelector('dialog img:nth-of-type(1)');
// let lightboxParagraph = document.querySelector('dialog p:nth-of-type(1)');
// let mediaData = null;

function lightbox (mediasData) {
    let lightboxElement = document.getElementsByTagName('dialog')[0];
    let imagesLink = document.querySelectorAll('.link_image');

    imagesLink.forEach(link => {
        link.addEventListener('click', function (e) {
            lightboxElement.style.display = "flex";
            let mediaData = mediasData[link.dataset.id];
            console.log(mediaData)
            console.log(link)
            if (mediaData.video !== undefined) {
                console.log('video');
                // replaceLightboxContentToVideo(e.target.firstChild.src, lightbox)
                return;
            }
            console.log('image');
            replaceLightboxContentToImg(e.target.src, lightbox);
            // replaceLightboxContentToImg(e.target.src, lightbox);
        })
    })

//     function replaceLightboxContentToImg(imgSrc, parentNode) {
//         removeLightboxOldContent(parentNode);
//         let newImage = document.createElement('img');
//         newImage.setAttribute('src', imgSrc);
//         parentNode.insertBefore(newImage, document.querySelector('dialog p:nth-of-type(1)'));
//
//         // for, faire matcher la src, prendre le bon paragraphe et l'afficher
//         console.log(mediaData);
//
//
//         for (let i = 0; i < mediaData.length; i++) {
//             // 'sport_water_tunnel.jpg' récuperer le chemin de l'image
//             // prendre la fin de imgSrc
//             if (mediaData[i].image === 'sport_water_tunnel.jpg') {
//                 lightboxParagraph.innerText = mediaData[i].title;
//                 // code pour changer le paragraphe html
//             }
//         }
//     }
//     function removeLightboxOldContent() {
//     if (document.querySelector('dialog img') === null) {
//         // supprimer une video
//         console.log('video');
//         let video = document.querySelector('dialog video:nth-of-type(1)');
//         video.remove();
//     }
//
//     if (document.querySelector('dialog video') === null) {
//         // supprimer une image
//         console.log('image');
//         let image = document.querySelector('dialog img:nth-of-type(1)');
//         console.log(image);
//         image.remove();
//     }
// }

    let lightboxCloseBtn = document.querySelector('i.fa-xmark');
    lightboxCloseBtn.addEventListener('click', function (e) {
        lightboxElement.style.display = "none";
    })

    // console.log(imagesLink)
}




// console.log(imagesLink);
// let promise = new Promise((resolve, reject) => {
//     setTimeout(function () {
//         let imagesLinkArray = Array.from(imagesLink);
//
//         if (imagesLinkArray.length === 0) {
//             return reject('erreur');
//         }
//
//         resolve(imagesLinkArray);
//     }, 250);
// }).then(
//
// );

// let promise = new Promise((resolve, reject) => {
//     console.log(imagesLink);
//     console.log(Array.from(imagesLink));
//     let imagesLinkArray = Array.from(imagesLink);
//
//     if (imagesLinkArray.length === 0) {
//         return reject('erreur');
//     }
//
//     resolve(imagesLinkArray);
//
// }).then((val) => {
//     console.log(val);
// });
//
// promise
//     .then((val) => {
//         console.log(val);
//         Array.from(val).forEach(link => {
//             link.addEventListener('click', function (e) {
//                 console.log(e.target.src);
//                 lightbox.style.display = "flex";
//                 if (e.target.localName === 'video') {
//                     replaceLightboxContentToVideo(e.target.firstChild.src, lightbox)
//                     return;
//                 }
//                 replaceLightboxContentToImg(e.target.src, lightbox);
//             })
//         })
//     })
//     .catch((val) => {
//         console.warn(val)
//     })


//
//
// function replaceLightboxContentToVideo(videoSrc, parentNode) {
//     removeLightboxOldContent(parentNode);
//     let video = document.createElement('video');
//     video.setAttribute('controls', 'true');
//
//     let source = document.createElement('source');
//     source.setAttribute('src', videoSrc);
//     source.setAttribute('type', 'video/mp4');
//
//     video.appendChild(source);
//
//     parentNode.insertBefore(video, document.querySelector('dialog p:nth-of-type(1)'));
// }
//
// function sendDataToLightbox(data) {
//     mediaData = data;
// }

// if(imagesLinkArray.length > 0) {
//     console.log('parfait');
// }

// Array.from(imagesLink).forEach(link => {
//     console.log(link);
//     link.addEventListener('click', function (e) {
//         // e.preventDefault();
//         console.log(e.target);
//         // console.log(lightbox);
//         // console.log(e.target);
//         // console.log('test')
//     })
// });
