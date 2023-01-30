import { createSlice } from "@reduxjs/toolkit"

export interface Counter {
    val: number
}

const initialState: Counter = {
    val: 5
}

export const demoSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {
        up: (s, a) => {
            s.val += a.payload
        },
        down: (s, a) => {
            s.val -= a.payload
        }
    }
})

export const { up, down } = demoSlice.actions