const MOVIE_URL = (tag) => {
    return `https://api.themoviedb.org/3/movie/${tag}?api_key=${API_KEY}`;
};

const MOVIES_URL = (tag, page) => {
    return `https://api.themoviedb.org/3/movie/${tag}?api_key=${API_KEY}&language=en-US&page=${page}`;
};

const SEARCH_URL = (search, page) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false&region=asa`;
};

const CREADIT_URL = (movieID) => {
    return `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}`;
};

const REVIEW_URL = (movieID) => {
    return `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${API_KEY}`;
};

const RECOM_URL = (movieID) => {
    return `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_KEY}`;
};

const VIDEO_URL = (movieID) => {
    return `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}`;
};

// const getMovies = async (URL) => {
//     const response = await fetch(URL);
//     const data = await response.json();
//     return data;
// };

const getMovies = async (URL) => {
    const response = await fetch(URL);
    return await response.json();
};
