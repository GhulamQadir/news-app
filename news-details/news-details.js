
let getSourceName = document.getElementById('sourceName');
let getNewsTitle = document.getElementById('title')
let getNewsDescription = document.getElementById('description')
let getNewsImg = document.getElementById('newsImg')
let getTimeOfPublish = document.getElementById('timeOfPublish')
let getCountry = document.getElementById('country')
let getCreator = document.getElementById('creator')
let getSourceUrl = document.getElementById('sourceUrl')
let getLanguage = document.getElementById('language')

getNews = () => {
    let news = JSON.parse(sessionStorage.getItem("newsDetails"))

    let { title, image, description, timeOfPublish, sourceName, sourceUrl, language, creator, country } = news
    sourceName ? getSourceName.innerText = sourceName : getSourceName.style.display = "none"
    getNewsTitle.innerText = title
    getTimeOfPublish.innerText = timeOfPublish
    getNewsImg.src = image
    getNewsDescription.innerText = description
    country ? getCountry.innerText = `Country: ${country.slice(0, 1).toUpperCase()}${country.slice(1)}` : getCountry.style.display = "none"
    getSourceUrl.setAttribute('href', sourceUrl)
    getSourceUrl.innerText = sourceUrl
    language ? getLanguage.innerText = `Language: ${language.slice(0, 1).toUpperCase()}${language.slice(1)}` : getLanguage.style.display = "none"
    creator ? getCreator.innerText = `Creator: ${creator}` : getCreator.style.display = "none"

}
getNews()
