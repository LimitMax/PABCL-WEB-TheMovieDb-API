//Event Film Terpopuler, Top Rate, dan Comingsoon
document.addEventListener("DOMContentLoaded", () => {
  const popularSection = document.querySelector("#popular");
  const topratedSection = document.querySelector("#top_rated");
  const upcomingSection = document.querySelector("#upcoming");
  showMovies(MOVIE_URL("popular"), popularSection);
  showMovies(MOVIE_URL("top_rated"), topratedSection);
  showMovies(MOVIE_URL("upcoming"), upcomingSection);
});

//Menampilkan Movie
const showMovies = (URL, container) => {
  getMovies(URL).then((data) => {
    data.results.forEach((movie) => {
      const movieCard = new MovieCard(movie);
      container.appendChild(movieCard);
    });
    updateContainer(container.parentElement.parentElement);
  });
};
