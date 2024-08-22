let favsContainer = document.getElementById('favsContainer')



deleteFavPost = () => {

}

getFavouriteNews = () => {
    let favsArray = JSON.parse(localStorage.getItem("favourites"))
    if (favsArray) {
        console.log(favsArray)
        for (let i = 0; i < favsArray.length; i++) {
            let { title, description, image, duplicate, sourceName, sourceUrl, pubTime, country, creator, language } = favsArray[i]
            let timeOfPublish = moment(pubTime).fromNow();
            favsContainer.innerHTML += `<div class="card">
             ${!duplicate ? '<span class="uniqueBadge">Unique</span>' : ""} 
               <img src="${image}" class="card-img-top cardImg" alt="...">
               <div class="card-body">
               <div class="title_delBtn_div">
               <h5 class="card-title">${title.slice(0, 23)}</h5>
               <button onclick="deleteFavPost()" class="deleteFavBtn"><i class="fa-solid fa-trash"></i></button>
               </div>
            ${description ? `<p class="card-text description">${description.slice(0, 170)} ...</p>` : ""}  
               <p class="source"><span class="sourceHeading">Source:</span> ${sourceName}</p>
               <p class="timeOfPublish">${timeOfPublish}</p>
               <button class="readMoreBtn">Read More</button>
            </div>
        </div>`
        }
    }
}
getFavouriteNews()
