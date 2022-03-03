if (window.location.search != '') {
    const params = new URLSearchParams(window.location.search);

    if (
        params.has('popular') ||
        params.has('top_rated') ||
        params.has('upcoming')
    ) {
        const tag = params.keys().next().value;

        let page = 1;

        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('movie-container');
            const sectionHeader = document.querySelector(
                '.movieSection__head .title'
            );
            const moreButton = document.querySelector('.btn__more');
            sectionHeader.textContent = tag;
            moreButton.addEventListener('click', () => {
                page += 1;
                showMovies(container);
            });
            showMovies(container);
        });
        const showMovies = (container) => {
            getMovies(MOVIES_URL(tag, page))
                .then((data) => data.results)
                .then((movies) => {
                    movies.forEach((movie) => {
                        const movieCard = new MovieCard(movie);
                        container.appendChild(movieCard);
                    });
                });
        };
    }
} else {
    let page = 1;
    const tag = 'Movies';

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('movie-container');
        const sectionHeader = document.querySelector(
            '.movieSection__head .title'
        );
        const moreButton = document.querySelector('.btn__more');
        sectionHeader.textContent = tag;
        moreButton.addEventListener('click', () => {
            page += 1;
            showMovies(container);
        });
        showMovies(container);
    });
    const showMovies = (container) => {
        getMovies(MOVIES_URL('now_playing', page))
            .then((data) => data.results)
            .then((movies) => {
                movies.forEach((movie) => {
                    const movieCard = new MovieCard(movie);
                    container.appendChild(movieCard);
                });
            });
    };
}
