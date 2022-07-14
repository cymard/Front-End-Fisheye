function mediasFactory (photographerMediaData, photographerName){
    console.log(photographerMediaData);
    console.log(photographerName);
    // donner ça en parametre et le trie est fait
    // const allMediasPopularity = ;
    // const allMediasDate = ;
    // const allMediasTitle = ;

    function createMedias (allMedias) {
        allMedias.forEach((element, index) => {
            console.log(element, index)
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

    return {createMedias, displaySumOfAllLikes}
}