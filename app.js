
// pick random key
let apiKeys = ["pub_51337b3e235f8f9025f884fe1fd4ac29c0e6f", "pub_51445fc3c83707915d3280417e473c9d45166", "pub_51497faa98d4a0250afe72309df8557215867"]
let randomNum = Math.floor(Math.random() * 3)
let randomKey = apiKeys[randomNum]



let newsDiv = document.getElementById('newsDiv')
let nextPage = ""
let value = ""
let favouritesArray = []
let spinner = document.getElementById('spinner')
let searchInput = document.getElementById('searchInput')

// getting favourites news to check whether the current news updates are added to favourites or not
getFavouriteNews = () => {
    let getFavs = JSON.parse(localStorage.getItem("favourites"))
    if (getFavs) {
        favouritesArray = getFavs
    } else {
        favouritesArray = []
    }
}
getFavouriteNews()


// constructor function for adding news to favourites
function FavouriteNews(title, image, description, source_name, source_url, pubTime, country, creator, language) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.sourceName = source_name;
    this.sourceUrl = source_url;
    this.pubTime = pubTime;
    this.country = country;
    this.creator = creator;
    this.language = language;
}

// add to favs functionality
addToFavourites = (title, image, description, source_name, source_url, pubTime, country, creator, language, currentBtn) => {
    let favNewsMatched = false

    for (let i = 0; i < favouritesArray.length; i++) {
        if (favouritesArray[i].description === description) {
            favNewsMatched = true
            favouritesArray.splice(i, 1)
            currentBtn.style.color = "black"
            localStorage.setItem("favourites", JSON.stringify(favouritesArray))
        }
    }
    if (!favNewsMatched) {
        favouritesArray.unshift(new FavouriteNews(title, image, description, source_name, source_url, pubTime, country, creator, language))
        localStorage.setItem("favourites", JSON.stringify(favouritesArray))
        console.log("Add hogya")
        currentBtn.style.color = "rgb(198, 55, 55)"
    }
}

// render error display on page
displayError = (error) => {
    newsDiv.innerHTML = `<p class="error"><span class="errorHeading">Error Occured:</span> ${error}</p>`
}

// constructor for viewing details of news
function DetailsOfNews(title, image, description, source_name, source_url, timeOfPublish, country, creator, language) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.sourceName = source_name;
    this.sourceUrl = source_url;
    this.timeOfPublish = timeOfPublish;
    this.country = country;
    this.creator = creator;
    this.language = language;
}

// view news details functionality
newsDetails = (title, image, description, source_name, source_url, timeOfPublish, country, creator, language) => {
    sessionStorage.setItem("newsDetails", JSON.stringify(new DetailsOfNews(title, image, description, source_name, source_url, timeOfPublish, country, creator, language)))
    window.location.assign(newsDiv.dataset.pathofdetails)
    console.log(newsDiv.dataset)
}


// get news api data and rendering on page
getData = () => {
    spinner.style.display = "block"
    let apiUrl = `https://newsdata.io/api/1/latest?apikey=${randomKey}&q=${newsDiv.dataset.category} ${value}&size=10`
    if (nextPage) {
        apiUrl = `https://newsdata.io/api/1/latest?apikey=${randomKey}&q=${newsDiv.dataset.category} ${value}&size=10&page=${nextPage}`
    }
    fetch(apiUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            spinner.style.display = "none"
            if (data.status === "error") {
                displayError(data.results.message)
            }
            nextPage = data.nextPage
            let results = data.results
            for (let i = 0; i < results.length; i++) {
                let { title, description, image_url, duplicate, source_name, source_url, pubDate, country, creator, language } = results[i]
                let image = image_url ? image_url : "https://i.pinimg.com/originals/da/9a/83/da9a837c41ca183a3d5f8d4dca495955.png"
                let timeOfPublish = moment(pubDate).fromNow();

                let matchedColor = ""
                for (let j = 0; j < favouritesArray.length; j++) {
                    if (results[i].description === favouritesArray[j].description) {
                        matchedColor = "favMatchedColor"
                        console.log("matched")
                    }
                }
                newsDiv.innerHTML += `<div class="card">
             ${!duplicate ? '<span class="uniqueBadge">Unique</span>' : ""} 
               <img src="${image}" class="card-img-top cardImg" alt="...">
               <div class="card-body">
               <div class="title_fav_div">
               <h5 class="card-title">${title.slice(0, 23)}</h5>
               <button onclick="addToFavourites(\`${title ? title : ""}\`,\`${image}\`,\`${description ? description : ""}\`,\`${source_name ? source_name : ""}\`,\`${source_url ? source_url : ""}\`,\`${pubDate ? pubDate : ""}\`,\`${country ? country : ""}\`,\`${creator ? creator : ""}\`,\`${language ? language : ""}\`, this)" class="favBtn ${matchedColor}"><i class="fa-solid fa-heart"></i></button>
               </div>
            ${description ? `<p class="card-text description">${description.slice(0, 140)} ...</p>` : ""}  
               <p class="source"><span class="sourceHeading">Source:</span> ${source_name}</p>
               <p class="timeOfPublish">${timeOfPublish}</p>
               <button class="readMoreBtn" onclick="newsDetails(\`${title ? title : ""}\`,\`${image}\`,\`${description ? description : ""}\`,\`${source_name ? source_name : ""}\`,\`${source_url ? source_url : ""}\`,\`${timeOfPublish ? timeOfPublish : ""}\`,\`${country ? country : ""}\`,\`${creator ? creator : ""}\`,\`${language ? language : ""}\`)">Read More</button>
            </div>
        </div>`
            }
        })
        .catch((error) => {
            console.log(error)
            spinner.style.display = "none"
            displayError(error)
        })
}
getData()

// getting data from api by searching
getNewsBySearch = (event) => {
    event.preventDefault()
    if (searchInput.value) {
        newsDiv.innerHTML = ""
        value = searchInput.value
        getData()
    }
}


// rendering next page of data when page scrolls
let eventTriggered = false;
let lastTriggerPosition = 0;

window.addEventListener('scroll', function () {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;


    if (scrollTop + clientHeight + 400 >= scrollHeight && !eventTriggered) {
        console.log('You are within 200 pixels of the bottom!');
        eventTriggered = true;
        lastTriggerPosition = scrollTop;
    }

    if (eventTriggered && scrollTop >= lastTriggerPosition + 200) {
        console.log('You have scrolled 200 pixels more!');
        getData()
        eventTriggered = false;
        lastTriggerPosition = scrollTop;
    }
});


document.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        if (searchInput.value) {
            console.log(event)
            getNewsBySearch(event)
        }
    }
})