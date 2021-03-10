import AsyncStorage from "@react-native-async-storage/async-storage";
import {decks} from "./data";

export async function handleInitialData() {
    return Promise.all([
        AsyncStorage.setItem('decks', JSON.stringify(decks)),
    ]).then(async () => {
        let decks = await AsyncStorage.getItem('decks');
        decks = JSON.parse(decks)

        return new Promise((res, rej) => {
            res(decks)
        })
    })
}

export async function getDecks() {
    return AsyncStorage.multiGet(await AsyncStorage.getAllKeys())
}

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function createDeckFromTitle(title) {
    return {id: generateUID(), title, questions: []};
}

export async function saveDeck (title) {
    const deck = createDeckFromTitle(title)

    await AsyncStorage.setItem(deck.id, JSON.stringify(deck))

    return deck
}

export async function saveCardToDeck (deckId, card) {
    let deck = await AsyncStorage.getItem(deckId)

    deck = JSON.parse(deck)
    deck.questions.push(card)

    await AsyncStorage.setItem(deck.id, JSON.stringify(deck))

    return deck
}