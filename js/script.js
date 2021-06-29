
const api_url = "https://api.themoviedb.org/3";
const api_key = "api_key=a56839337f2449ec1e4b01337ce4ba82";
const url = api_url + '/discover/movie?sort_by=popularity.desc&' + api_key;
const img_path = "https://image.tmdb.org/t/p/w500";
const search_url = api_url + '/search/movie?' + api_key;
const main = document.getElementById('main');
const search = document.getElementById('srch');
const form = document.getElementById('form');

https://api.themoviedb.org/3/search/movie?api_key=a56839337f2449ec1e4b01337ce4ba82

getMovies(url);
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    }
    )
}

function showMovies(data) {
    main.innerHTML = "";
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
                <img src="${poster_path ? (img_path + poster_path) : `images/NoImg.jpg`}" alt = "${title}">
                <div class = "movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>
                <div class = "overview">
                <h3 id="over">Overview</h3>
                ${overview}
                </div>`

        main.appendChild(movieEl);
    })
}
function getColor(vote) {
    if (vote >= 8) { return 'green' }
    else if (vote >= 5) { return 'orange' }
    else { return 'red' }

}
form.addEventListener('submit', (e) => {

    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(search_url + '&query=' + searchTerm)
    }

})

