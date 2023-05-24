const filmURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=203467c6446008929a5df9da500416de"
const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=203467c6446008929a5df9da500416de&query="
const images = "https://image.tmdb.org/t/p/w1280/";
const search = document.querySelector(".search-bar")
const form = document.querySelector("form")
const filterOption = document.getElementById("filter");
const display = document.getElementById("diplay");


let movies = []; 

Movies(filmURL);
async function Movies(url) {
  const response = await fetch(url);
  const data = await response.json();
  movies = data.results; 
  displayMovies(movies);
}

function displayMovies(movies) {
  display.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    const { title, poster_path, vote_average,release_date } = movies[i];
    const moviesElement = document.createElement("div");
    moviesElement.classList.add("movie");
    moviesElement.innerHTML = `
    <div class="container">
     <div class="box">
     <div class="img">
      <img src = "${images+ poster_path}" alt = "food">
     </div>
     <h3 class = "title">${title}</h3>
     <div class="movie-rating">
     <span class="${ratingColour(vote_average)}"> ${vote_average}</span>
     <div class="release-date ">
     <p><b>Release Date :</b> ${release_date}</p>
     </div>
     ` 
    display.appendChild(moviesElement);
  }
}


function ratingColour(vote){
  if(vote>=8){
      return 'green '
  }else if
  (vote>=6){
          return 'orange'
      }else{
          return 'red'
      }
  }


function searchMovie(e){
  e.preventDefault();
   const searchValue = search.value;
  if (searchValue && searchValue !== "") {
    Movies(searchUrl+searchValue);
    searchValue = "";
  }
};



filterOption.addEventListener("change",()=>{
  const filterOpt = filterOption.value;

   if (filterOpt === "Latest Release Date"){
    movieFilter = NewMoviesDate(movies);
   }
  
  else if (filterOpt === "Oldest Release Date"){
   movieFilter = OldestMoviesDate(movies);
  }
  else if (filterOpt === "Highest Rating"){
    movieFilter = HighestMoviesRating(movies);  
  }
  else if(filterOpt === "Losest Rating")
  movieFilter = LowestMoviesRating(movies);

  displayMovies(movieFilter)
})


function NewMoviesDate(movies) {
  return movies.sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  );
}

function OldestMoviesDate(movies) {
  return movies.sort(
    (b, a) => new Date(b.release_date) - new Date(a.release_date)
  );
}


function HighestMoviesRating(movies) {
  return movies.sort((a, b) => b.vote_average - a.vote_average);
}

function LowestMoviesRating(movies) {
  return movies.sort((b, a) => b.vote_average - a.vote_average);
}

