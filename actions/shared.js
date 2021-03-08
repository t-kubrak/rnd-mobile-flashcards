import {getDecks} from "../utils/data";

export function handleInitialData () {
    return Promise.all([getDecks()]);
}