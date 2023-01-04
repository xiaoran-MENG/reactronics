import { createStore } from "redux";
import counterReducer from "../../features/contact/DemoReducer";

export function configStore() {
    return createStore(counterReducer)
}