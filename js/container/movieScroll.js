const updateContainer = (root) => {
    const movieContainer = root.querySelector('.movie__container');
    const prev = movieContainer.querySelector('.scroll__button .prev');
    const next = movieContainer.querySelector('.scroll__button .next');
    const movieCards = movieContainer.querySelector('.movieContainer__card');
    const cards = movieCards.querySelectorAll('.movie__card');

    let containerWidth = movieContainer.clientWidth;

    prev.classList.add('hide');
    if (movieCards.scrollWidth <= containerWidth) {
        prev.classList.add('hide');
        next.classList.add('hide');
    }

    let iterator = Math.floor(containerWidth / cards.item(0).clientWidth) * 200;

    // Update containerWidth & iterator if window resize
    window.addEventListener('resize', () => {
        containerWidth = movieContainer.clientWidth;
        iterator = Math.floor(containerWidth / cards.item(0).clientWidth) * 200;
    });

    prev.addEventListener('click', () => {
        movieCards.scrollLeft -= iterator;

        //  Check scroll offset for prev
        if (movieCards.scrollLeft <= movieCards.offsetWidth) {
            prev.classList.add('hide');
        }
        next.classList.remove('hide');
    });

    next.addEventListener('click', () => {
        movieCards.scrollLeft += iterator;

        // Check scroll offset for next
        if (
            Math.ceil(movieCards.offsetWidth + movieCards.scrollLeft) >=
            movieCards.scrollWidth - movieCards.offsetWidth
        ) {
            next.classList.add('hide');
        }
        prev.classList.remove('hide');
    });

    movieCards.addEventListener('scroll', () => {
        prev.classList.remove('hide');
        next.classList.remove('hide');
        if (
            Math.ceil(movieCards.offsetWidth + movieCards.scrollLeft) >=
            movieCards.scrollWidth
        ) {
            next.classList.add('hide');
        }
        if (movieCards.scrollLeft == 0) {
            prev.classList.add('hide');
        }
    });
};
