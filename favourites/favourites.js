let favsContainer = document.getElementById('favsContainer')
let favsArray = JSON.parse(localStorage.getItem("favourites"))

deleteFavPost = (event, index) => {
    event.parentNode.parentNode.parentNode.remove()
    favsArray.splice(index, 1)
    localStorage.setItem("favourites", JSON.stringify(favsArray))
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
    window.location.assign("../news-details/news-details.html")
}

// getting favs news and rendering on app
getFavouriteNews = () => {
    if (favsArray) {
        for (let i = 0; i < favsArray.length; i++) {
            let { title, description, image, duplicate, sourceName, sourceUrl, pubTime, country, creator, language } = favsArray[i]
            let timeOfPublish = moment(pubTime).fromNow();
            favsContainer.innerHTML += `<div class="card">
             ${!duplicate ? '<span class="uniqueBadge">Unique</span>' : ""} 
               <img src="${image}" class="card-img-top cardImg" alt="...">
               <div class="card-body">
               <div class="title_delBtn_div">
               <h5 class="card-title">${title.slice(0, 23)}</h5>
               <button onclick="deleteFavPost(this,${i})" class="deleteFavBtn"><i class="fa-solid fa-trash"></i></button>
               </div>
            ${description ? `<p class="card-text description">${description.slice(0, 170)} ...</p>` : ""}  
               <p class="source"><span class="sourceHeading">Source:</span> ${sourceName}</p>
               <p class="timeOfPublish">${timeOfPublish}</p>
               <button class="readMoreBtn" onclick="newsDetails(\`${title ? title : ""}\`,\`${image}\`,\`${description ? description : ""}\`,\`${sourceName ? sourceName : ""}\`,\`${sourceUrl ? sourceUrl : ""}\`,\`${timeOfPublish ? timeOfPublish : ""}\`,\`${country ? country : ""}\`,\`${creator ? creator : ""}\`,\`${language ? language : ""}\`)">Read More</button>
            </div>
        </div>`
        }
    }
}
getFavouriteNews()
