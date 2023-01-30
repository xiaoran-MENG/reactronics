import { configureStore } from "@reduxjs/toolkit";
import { demoSlice } from "../../features/contact/DemoSlice";

// import { createStore } from "redux";
// export function configStore() {
//     return createStore(counterReducer)
// }

export const store = configureStore({
    reducer: {
        demo: demoSlice.reducer
    }
})