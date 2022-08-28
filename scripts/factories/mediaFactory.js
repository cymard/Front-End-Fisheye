function mediaFactory (mediaData) {
  function createVisualMedia (dataId, photographerName) {
    const figure = document.createElement('figure')

    const link = document.createElement('a')
    link.dataset.id = dataId
    link.setAttribute('href', '#')
    link.setAttribute('class', 'link_image')
    link.setAttribute('tabindex', '5')

    // display image or video
    if (mediaData.image === undefined) {
      const linkVideo = document.createElement('video')
      linkVideo.setAttribute('width', '250')
      linkVideo.setAttribute('title', mediaData.title)

      const linkVideoSource = document.createElement('source')
      linkVideoSource.setAttribute('src', 'assets/images/' + photographerName + '/' + mediaData.video)
      linkVideoSource.setAttribute('type', 'video/mp4')

      link.ariaLabel = mediaData.title + ', closeup view'

      link.appendChild(linkVideo)
      linkVideo.appendChild(linkVideoSource)
    } else {
      const linkImg = document.createElement('img')
      linkImg.setAttribute('src', 'assets/images/' + photographerName + '/' + mediaData.image)
      linkImg.setAttribute('alt', mediaData.title)

      link.ariaLabel = mediaData.title + ', closeup view'

      link.appendChild(linkImg)
    }

    const figcaption = document.createElement('figcaption')

    const figcaptionPara = document.createElement('p')
    figcaptionPara.textContent += mediaData.title

    const figcaptionSpan = document.createElement('span')
    figcaptionSpan.textContent += mediaData.likes + ' '

    const figcaptionSpanHeartIcon = document.createElement('i')
    figcaptionSpanHeartIcon.setAttribute('class', 'fa-solid fa-heart')
    figcaptionSpanHeartIcon.setAttribute('aria-label', 'likes')
    figcaptionSpanHeartIcon.classList.add('hearthIcone')
    figcaptionSpanHeartIcon.addEventListener('click', (e) => {
      if (figcaptionSpanHeartIcon.classList.contains('hearthIcone')) {
        const newLikeNumber = parseInt(e.target.parentNode.firstChild.wholeText) + 1
        e.target.parentNode.removeChild(e.target.parentNode.firstChild)
        e.target.parentNode.firstChild.classList.remove('hearthIcone')
        e.target.parentNode.insertBefore(new Text(newLikeNumber.toString() + ' '), e.target.parentNode.firstChild)
        const totalLikes = document.getElementById('totalLikes')
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1
      }
    })

    // Relier les blocs
    figure.appendChild(link)
    figure.appendChild(figcaption)
    figcaption.appendChild(figcaptionPara)
    figcaption.appendChild(figcaptionSpan)
    figcaptionSpan.appendChild(figcaptionSpanHeartIcon)

    // Lier à la page
    const divPictures = document.getElementById('pictures')
    divPictures.appendChild(figure)
  }

  return { createVisualMedia }
}
