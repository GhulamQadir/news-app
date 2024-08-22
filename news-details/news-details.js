
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
    console.log(country.slice(0, 1).toUpperCase())
    getSourceName.innerText = sourceName
    getNewsTitle.innerText = title
    getTimeOfPublish.innerText = timeOfPublish
    getNewsImg.src = image
    getNewsDescription.innerText = description
    getCountry.innerText = `Country: ${country.slice(0, 1).toUpperCase()}${country.slice(0)}`
    console.log(getSourceUrl)
    getSourceUrl.setAttribute('href', sourceUrl)
    getSourceUrl.innerText = sourceUrl
    getLanguage.innerText = `Language: ${language.slice(0, 1).toUpperCase()}${language.slice(1)}`
    if (creator) {
        getCreator.innerText = `Creator: ${creator}`
    }
    else {
        getCreator.style.display = "none"
    }
}
getNews()
