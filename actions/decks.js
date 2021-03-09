export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks: decks,
    }
}

export function addCard (deckId, card) {
    return {
        type: ADD_CARD,
        deckId,
        card,
    }
}
