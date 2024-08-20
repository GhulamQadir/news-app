// fetch('https://newsdata.io/api/1/latest?apikey=pub_51337b3e235f8f9025f884fe1fd4ac29c0e6f')


// free news api (world news api) 1 request/second


let newsDiv = document.getElementById('newsDiv')
let nextPage = ""
let value = "general"
getData = () => {
    let apiUrl = `https://newsdata.io/api/1/latest?apikey=pub_51337b3e235f8f9025f884fe1fd4ac29c0e6f&q=${value}&country=pk&size=10`
    if (nextPage) {
        apiUrl = `https://newsdata.io/api/1/latest?apikey=pub_51337b3e235f8f9025f884fe1fd4ac29c0e6f&q=${value}&country=pk&size=10&page=${nextPage} `
    }
    fetch(apiUrl)
        .then(response => response.json())
        .then((data) => {
            nextPage = data.nextPage
            let results = data.results
            for (let i = 0; i < results.length; i++) {
                newsDiv.innerHTML += `<div class="card" style = "width: 22rem;">
        <img src="${results[i].image_url}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text"></p>
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