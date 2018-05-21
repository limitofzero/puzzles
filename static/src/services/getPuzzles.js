import {puzzleLoaded, puzzleLoading, puzzleLoadingError} from '../actions';
import config from '../config';

export default function getPuzzles() {
        return dispatch => {
            dispatch(puzzleLoading());

            fetch(config.serverUrl + '/puzzles')
                .then((response) => {
                    if(!response.ok) {
                        throw Error(response.statusText);
                    }

                    return response;
                })
                .then(response => response.json())
                .then(data => dispatch(puzzleLoaded(data)))
                .catch(() => {
                    dispatch(puzzleLoadingError())
                });
        }
    }