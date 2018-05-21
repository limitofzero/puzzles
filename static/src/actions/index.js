import {PUZZLE_VALUE_CHANGED, PUZZLE_LOADED, PUZZLE_LOADING, PUZZLE_LOADING_ERROR} from '../constants';

export function puzzleValueChanged({puzzleName, valueName, value}) {
    return {
        type: PUZZLE_VALUE_CHANGED,
        payload: {
            puzzleName, valueName, value
        }
    };
}

export function puzzleLoading() {
    return {
        type: PUZZLE_LOADING
    }
}

export function puzzleLoaded(data) {
    return {
        type: PUZZLE_LOADED,
        payload: {
            data
        }
    }
}

export function puzzleLoadingError() {
    return {
        type: PUZZLE_LOADING_ERROR
    }
}