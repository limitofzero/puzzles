import {PUZZLE_LOADING, PUZZLE_LOADED, PUZZLE_LOADING_ERROR, PUZZLE_VALUE_CHANGED} from '../constants';
import puzzleModel from '../puzzles';

const initialState = {
    loading: false,
    loaded: false,
    withError: false,
    puzzleModel: null
};

export default function puzzleReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case PUZZLE_VALUE_CHANGED:
            return {
                ...state,
                ...state.puzzles.map(puzzle => {
                    if(puzzle.name === payload.puzzleName) {
                        const value = puzzle.values[payload.valueName];
                        value.value = payload.value;
                    }

                    return puzzle;
                })
            };
        case PUZZLE_LOADING:
            return {
                ...state,
                loading: true
            };
        case PUZZLE_LOADED:
            return {
                ...state,
                loading: false,
                loaded: true,
                puzzleModel: payload.data
            };
        case PUZZLE_LOADING_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                withError: true,
                //сделано на случай запуска без сервера
                puzzleModel
            };
        default:
            return state;
    }
}