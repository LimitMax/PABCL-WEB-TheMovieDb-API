class NavigationBar extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
        <header>
            <nav>
                <!-- App Name or Logo -->
                <div class="nav__leftGroup">
                    <a href="index.html" class="nav__logo">
                       TMDB - LimitMax
                    </a>
                </div>
                 <!-- Search Button -->
                <div class="nav__rightGroup__large">
                    <div class="nav__menu">
                        <div class="nav__item">
                            <a href="index.html" class="item__menu">Home</a>
                            <a href="movie.html" class="item__menu">Movies</a>
                        </div>
                    </div>
                    <form action="movie.html" class="search__form">
                        <input type="text" placeholder="Search Movies..." name="search">
                        <button type="submit" class="button__search item__menu">
                            <i class="fa fa-search"></i>
                        </button>
                    </form>
                </div>
                <div class="nav__rightGroup__small">
                    <div class="button__menu">
                        <i class="fa-solid fa-bars"></i>
                    </div>
                </div>
                <div class="menu__small">
                    <div class="menu__wrap">
                        <div class="button__menuClose">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div class="search">
                            <form action="movie.html" class="search__form">
                                <input type="text" placeholder="Search Movies..." name="search">
                                <button type="submit" class="button__search item__menu">
                                    <i class="fa fa-search"></i>
                                </button>
                            </form>
                        </div>
                        <div class="nav__item">
                            <a href="index.html" class="item__menu">Home</a>
                            <a href="movie.html" class="item__menu">Movies</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        `;
  }

  connectedCallback() {
    const menuBtn = document.querySelector(".button__menu");

    const menuBox = document.querySelector(".menu__small");

    const menuBtnClose = document.querySelector(".button__menuClose i");

    menuBtn.addEventListener("click", () => {
      menuBox.style.setProperty("--menu--display", "block");
    });

    menuBtnClose.addEventListener("click", () => {
      menuBox.style.setProperty("--menu--display", "none");
    });
  }
}
customElements.define("nav-bar", NavigationBar);

class LandingHero extends HTMLElement {
  constructor() {
    super();
    this.setAttribute("class", "hero__section");
    this.innerHTML = `
            <div>
                <div>
                    <h1>
                       Welcome.
                    </h1>
                    <h2>
                      Millions of movies, TV shows and people to discover. Explore now.
                    </h2>
                </div>
            </div>
        `;
  }
}
customElements.define("hero-section", LandingHero);

class MovieCard extends HTMLElement {
  constructor(movie) {
    super();
    this.setAttribute("class", "movie__card");

    this.setAttribute("title", movie.title);
    this.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}"
            class="image">
            <div class="card__details">
                <div class="info">
                    <div class="rating">
                        <i class="fa-solid fa-star star"></i>
                        <span>${movie.vote_average.toFixed(1)}</span>
                    </div>
                    <div class="releaseDate">
                        ${movie.release_date}
                    </div>
                </div>
                <div class="title">
                    ${movie.title}
                </div>
            </div>
            <a href="./detail.html?id=${movie.id}" class="to__detail">

            </a>
        `;
  }
}
customElements.define("movie-card", MovieCard);

class MovieSection extends HTMLElement {
  constructor() {
    super();
    this.setAttribute("class", "movieSection");

    this.title = this.getAttribute("title");
    this.moreLink = this.getAttribute("more-link");
    this.movieTag = this.getAttribute("movie-tag");

    this.innerHTML = `
            <div class="movieSection__head">
                <p class="title">
                    ${this.title}
                </p>
                <a href="${this.moreLink}" class="more__link">
                    <span>FIND MORE</span> <i class="fa-solid fa-angle-right"></i>
                </a>
            </div>
            <div class="movie__container">
                <div class="scroll__button">
                    <div class="prev"><i class="fa-solid fa-chevron-left"></i></div>
                    <div class="next"><i class="fa-solid fa-chevron-right"></i></div>
                </div>
                <div class="movieContainer__card" id="${this.movieTag}"></div>
            </div>
    </div>
        `;
  }
}
customElements.define("movie-section", MovieSection);

class HeroMovieDetails extends HTMLElement {
  constructor(movie) {
    super();

    const date = new Date(movie.release_date);

    let genre = "";
    for (let i = 0; i < movie.genres.length; i++) {
      genre += movie.genres[i].name;
      if (i < movie.genres.length - 1) {
        genre += ", ";
      }
    }

    this.innerHTML = `
            <style>
                .detail__bg {
                    background-position: right -200px top;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-image: url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path});
                }
            </style>
            <div class="detail__bg">
                <div class="bg__layer">
                    <div class="detail__container">
                        <div class="poster">
                            <div class="poster__container">
                                <img src="http://image.tmdb.org/t/p/w500${movie.poster_path}" alt="poster">
                                <div class="layer" title="Play Trailer">
                                    <i class="fa-solid fa-play"></i>
                                </div>
                            </div>
                        </div>
                        <div class="details">
                            <div class="details__header">
                                <div class="header__title">
                                    <span class="title">${movie.title}</span>
                                    <span class="year">(${date.getFullYear()})</span>
                                </div>
                                <div class="header__info">
                                    ${movie.release_date} ${movie.production_countries.length == 0 ? "" : "(" + movie.production_countries[0].iso_3166_1 + ")"} • ${genre} • ${movie.runtime}m
                                </div>
                            </div>
                            <div class="rating">
                                <i class="fa-solid fa-star star"></i>
                                <span>${movie.vote_average}</span>
                            </div>
                            <div class="tagline">
                                <p>${movie.tagline}</p>
                            </div>
                            <div class="overview">
                                <h3>Overview</h3>
                                <p>${movie.overview}</p>
                            </div>
                            <div class="mainCrew">
                                <div class="director">
                                    <div class="director__name name"></div>
                                    <div class="job">Director</div>
                                </div>
                            </div>
                            <div class="more__details">
                                <div class="details">
                                    <more-details detail-iconClass="fa-solid fa-heading" detail-title="Original Title" detail-value="${movie.original_title}"></more-details>
                                    <more-details detail-iconClass="fa-solid fa-flag" detail-title="Status" detail-value="${movie.status}"></more-details>
                                    <more-details detail-iconClass="fa-solid fa-globe" detail-title="Original Languange" detail-value="${movie.original_language}"></more-details>
                                    <more-details detail-iconClass="fa-solid fa-coins" detail-title="Budget" detail-value="$${movie.budget.toLocaleString("en-US", { valute: "USD" })}"></more-details>
                                    <more-details detail-iconClass="fa-solid fa-chart-line" detail-title="Revenue" detail-value="$${movie.revenue.toLocaleString("en-US", { valute: "USD" })}"></more-details>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail__explore__wrapper">
            <div class="credits">
                <div class="cast">
                    <div class="header">Top Cast</div>
                    <div class="cast__contain">
                        <div class="cast__container"></div>
                    </div>
                </div>
                
            </div>
           
        </div>
        `;
  }
}
customElements.define("details-hero", HeroMovieDetails);

class MoreDetails extends HTMLElement {
  constructor() {
    super();
    this.className = "detail__item";
    const iconClass = this.getAttribute("detail-iconClass");
    const title = this.getAttribute("detail-title");
    const value = this.getAttribute("detail-value");

    this.innerHTML = `
            <div class="icon">
                <i class="${iconClass}"></i>
            </div>
            <div>
                <div class=" detail__title">
                    ${title}
                </div>
                <div class="value">
                    ${value}
                </div>
            </div>
        `;
  }
}
customElements.define("more-details", MoreDetails);

class MovieCastCard extends HTMLElement {
  constructor(img, name, job) {
    super();
    this.setAttribute("class", "cast__card");
    this.innerHTML = `
            <img src="${img}"
                alt="cast" class="cast__img">
            <div class="cast__info">
                <div class="cast__name">
                    ${name}
                </div>
                <div class="cast__job">
                    ${job}
                </div>
            </div>
        `;
  }
}
customElements.define("cast-card", MovieCastCard);

class ReviewCard extends HTMLElement {
  constructor(review) {
    super();

    this.setAttribute("class", "review__container");

    const avatar = review.author_details.avatar_path == undefined ? "assets/image/blank-avatar.png" : review.author_details.avatar_path.substring(1);

    const rating = review.author_details.rating;

    this.innerHTML = `
        
            <div class="review__detail">
                <div class="review__user">
                    <div>
                        ${review.author}
                    </div>
                    <div class="rating__label">
                        <i class="fa-solid fa-star star"></i>
                        ${rating == null ? "none" : rating}
                    </div>
                </div>
                <div class="review__content">
                    ${review.content}
                </div>
            </div>
        `;
  }
}
customElements.define("review-card", ReviewCard);

class MovieTrailer extends HTMLElement {
  constructor(video) {
    super();
    const trailer_key = video[0].key;
    this.setAttribute("class", "trailer__container");
    this.innerHTML = `
            <div class='trailer__wrapper'>
                <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${trailer_key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="video"></iframe>
            </div>
        `;
  }
}
customElements.define("movie-trailer", MovieTrailer);

class MyFooter extends HTMLElement {
  constructor() {
    super();

    this.setAttribute("class", "footer");

    this.innerHTML = `
            <footer>
               Taufiq Qurohman R. @LimitMax
            </footer>
        `;
  }
}
customElements.define("my-footer", MyFooter);
