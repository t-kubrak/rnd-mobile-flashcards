import {ADD_CARD, ADD_DECK, RECEIVE_DECKS} from '../actions/decks'

export default function decks (state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK : {
            const {deck} = action
            return {
                ...state,
                [deck.id]: deck
            }
        }
        case ADD_CARD : {
            const {deckId, card} = action
            return {
                ...state,
                    [deckId] : {
                        ...state[deckId],
                        questions: state[deckId].questions.concat([card])
                    }
                }
            }
        default :
            return state
    }
}