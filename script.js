const loadVideo = iframe => {
    const cid = 'UCnTj5w42sVAhNi1jW1M2fRg'
    const channelURL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`)
    const reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}`

    fetch(reqURL)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        const longFormVideos = result.items.filter(item => !item.link.includes('/shorts/'))

        const videoNumber = iframe.getAttribute('vnum')
        const link = longFormVideos[videoNumber].link
        const id = link.substring(link.indexOf('=') + 1)
        iframe.setAttribute('src', `https://youtube.com/embed/${id}?controls=0&autoplay=1`)
    })
    .catch(error => console.log('error', error))
}

const iframes = document.getElementsByClassName('latestVideoEmbed')
for (let i=0, len = iframes.length; i< len; i++){
    loadVideo(iframes[i])
}

const navToggle = document.getElementById('navToggle')
const navMenu = document.getElementById('navMenu')

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open')
  navToggle.setAttribute('aria-expanded', isOpen)
})