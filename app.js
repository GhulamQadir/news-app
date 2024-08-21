// fetch('https://newsdata.io/api/1/latest?apikey=pub_51337b3e235f8f9025f884fe1fd4ac29c0e6f')
// key = "pub_51337b3e235f8f9025f884fe1fd4ac29c0e6f", "pub_51445fc3c83707915d3280417e473c9d45166"

// free news api (world news api) 1 request/second


let newsDiv = document.getElementById('newsDiv')
console.log(newsDiv.dataset.category)
let nextPage = ""
let value = ""
getData = () => {
    let apiUrl = `https://newsdata.io/api/1/latest?apikey=pub_51445fc3c83707915d3280417e473c9d45166&q=${newsDiv.dataset.category} ${value}&size=10`
    if (nextPage) {
        apiUrl = `https://newsdata.io/api/1/latest?apikey=pub_51445fc3c83707915d3280417e473c9d45166&q=${newsDiv.dataset.category} ${value}&size=10&page=${nextPage}`
    }
    fetch(apiUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(data)

            nextPage = data.nextPage
            let results = data.results
            for (let i = 0; i < results.length; i++) {
                let { title, description, image_url, duplicate, source_name, pubDate } = results[i]
                let image = image_url ? image_url : "https://i.pinimg.com/originals/da/9a/83/da9a837c41ca183a3d5f8d4dca495955.png"
                let getDescription = description
                let slicedDescription = getDescription ? getDescription.slice(0, 140) : ""
                let timeOfPublish = moment(pubDate).fromNow();

                newsDiv.innerHTML += `<div class="card" style = "width: 22rem;">
             ${!duplicate ? '<span class="uniqueBadge">Unique</span>' : ""} 
               <img src="${image}" class="card-img-top cardImg" alt="...">
               <div class="card-body">
               <div class="title_fav_div">
               <h5 class="card-title">${title.slice(0, 23)}</h5>
               <button class="favBtn"><i class="fa-solid fa-heart"></i></button>
               </div>
               <p class="card-text description">${slicedDescription} ...</p>
               <p class="source"><span class="sourceHeading">Source:</span> ${source_name}</p>
               <p class="timeOfPublish">${timeOfPublish}</p>
               <button class="readMoreBtn">Read More</button>
            </div>
        </div>`
            }
        })
        .catch((error) => {
            console.log(error)
        })
}
getData()


getNewsBySearch = () => {
    let searchInput = document.getElementById('searchInput')
    if (searchInput.value) {
        newsDiv.innerHTML = ""
        value = searchInput.value
        getData()
    }
}
let eventTriggered = false;
let lastTriggerPosition = 0;

window.addEventListener('scroll', function () {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;


    // Check if the user is within 200 pixels of the bottom and the event hasn't been triggered
    if (scrollTop + clientHeight + 300 >= scrollHeight && !eventTriggered) {
        console.log('You are within 200 pixels of the bottom!');
        // Perform your desired actions here
        eventTriggered = true;
        lastTriggerPosition = scrollTop;
    }

    // Check if the user has scrolled 200 pixels more after the last trigger
    if (eventTriggered && scrollTop >= lastTriggerPosition + 250) {
        console.log('You have scrolled 200 pixels more!');
        getData()
        // Perform your desired actions here
        eventTriggered = false;
        lastTriggerPosition = scrollTop;
    }
});