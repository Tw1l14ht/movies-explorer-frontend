const paramsOfMoviesList = {
    fourCard: {
        width: 1200,
        params: {
            all: 16,
            add: 4
        }

    },
    threeCard: {
        width: 1116,
        params: {
            all: 15,
            add: 3
        }
    }
    , twoCard: {
        width: 765,
        params: {
            all: 8,
            add: 2
        }
    },
    oneCard: {
        width: 765,
        params: {
            all: 5,
            add: 2
        }
    },
}

const BASE_URL = 'https://api.twilight1.nomoredomainsmonster.ru';
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const DURATION = 40;

export { BASE_URL, MOVIES_URL, DURATION, paramsOfMoviesList };