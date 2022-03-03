const searchParams = new URLSearchParams(window.location.search);

if (searchParams.has('search')) {
    const searchValue = searchParams.get('search');
    let page = 1;
    var totalPage = 0;
    var totalResults = 0;
    const tag = searchValue;
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('movie-container');
        const sectionHeader = document.querySelector(
            '.movieSection__head .title'
        );

        const moreButton = document.querySelector('.btn__more');

        getSearchInfo().then(() => {
            sectionHeader.textContent = `${tag} (${totalResults})`;
            if(totalResults == 0) {
                moreButton.style.setProperty('--more--display', 'none');
            }
            moreButton.addEventListener('click', () => {
                page += 1;
                showMovies(container);
                if (page == totalPage) {
                    moreButton.style.setProperty('--more--display', 'none');
                }
            });
            showMovies(container);
        });
    });

    const getSearchInfo = async () => {
        return await getMovies(SEARCH_URL(searchValue, page)).then((movie) => {
            totalResults = movie.total_results;
            totalPage = movie.total_pages;
        });
    };

    const showMovies = (container) => {
        getMovies(SEARCH_URL(searchValue, page)).then((movie) => {
            const results = movie.results;
            results.forEach((movie) => {
                const movieCard = new MovieCard(movie);
                container.appendChild(movieCard);
            });
        });
    };
}
