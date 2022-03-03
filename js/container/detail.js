const params = new URLSearchParams(window.location.search);

const movieID = params.get("id");

const FACE_URL = "https://www.themoviedb.org/t/p/w276_and_h350_face/";

// EKSEKUSI DISINI
if (movieID != null) {
  document.addEventListener("DOMContentLoaded", () => {
    const detailSection = document.getElementById("detailSection");

    movieDetails(MOVIE_URL(movieID), detailSection)
      .then(movieCredits(CREADIT_URL(movieID), detailSection))
      .then(movieReview(REVIEW_URL(movieID)))
      .then(movieRecomendation(RECOM_URL(movieID)))
      .then(movieTrailer(VIDEO_URL(movieID), detailSection));
  });
}
//

// Method lain
const movieDetails = async (URL, container) => {
  const movie = await getMovies(URL);
  window.document.title += " - " + movie.title;
  const detailsHero = new HeroMovieDetails(movie);
  container.appendChild(detailsHero);
};

const movieCredits = async (URL, container) => {
  const credit = await getMovies(URL);
  const data = credit;
  container.querySelector(".director__name").textContent = getJob(data.crew, "Director").name;
  const cast = data.cast;
  const castContainer = document.querySelector(".cast__container");
  let i = 0;
  cast.every((people) => {
    const castCard = new MovieCastCard(people.profile_path == null ? "assets/image/blank-avatar.png" : FACE_URL + people.profile_path, people.name, people.character);
    castContainer.appendChild(castCard);
    i++;
    if (i > 9) {
      return false;
    }
    return true;
  });
};

const movieReview = async (URL) => {};

const movieRecomendation = async (URL) => {
  const review = await getMovies(URL);
  const movie = review.results;
  if (movie.length != 0) {
    displayRecom(movie);
  } else {
    const recom = await getMovies(MOVIE_URL("now_playing"));
    const results = recom.results;
    displayRecom(results);
  }
};

//Ambil url yt buat Trailer
const movieTrailer = async (URL, container) => {
  await getMovies(URL).then((video) => {
    const results = video.results;
    const movieTrailer = new MovieTrailer(results);
    container.appendChild(movieTrailer);
    //Open Trailer
    const trailerTrigger = document.querySelector(".poster");
    trailerTrigger.addEventListener("click", () => {
      trailerModal.style.setProperty(`--trailer--display`, "flex");
    });

    // Close Trailer
    const trailerModal = document.querySelector(".trailer__container");

    trailerModal.addEventListener("click", () => {
      trailerModal.style.setProperty(`--trailer--display`, "none");
    });
  });
};

// Pencarian job crew
const getJob = (arr, job) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].job === job) {
      return arr[i];
    }
  }
};
