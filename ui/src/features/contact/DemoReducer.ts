export const UP = 'UP'
export const DOWN = 'DOWN'

export interface Counter {
    val: number
}

const init: Counter = {
    val: 5
}

export const up = (n = 1) => {
    return {
        type: UP,
        payload: n
    }
}

export const down = (n = 1) => {
    return {
        type: DOWN,
        payload: n
    }
}

export default function counterReducer(state = init, action: any) {
    switch (action.type) {
        case UP:
            return {
                ...state,
                val: state.val + action.payload
            }
        case DOWN:
            return {
                ...state,
                val: state.val - action.payload
            }
        default:
            return state;
    }
}