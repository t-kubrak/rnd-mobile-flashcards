let decks = {
    React: {
        id: 'React',
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        id: 'JavaScript',
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function getDecks () {
    return new Promise((res, rej) => {
        res({...decks})
    })
}

function createDeckFromTitle(title) {
    return {id: generateUID(), title, questions: []};
}

export function saveDeck (title) {
    const deck = createDeckFromTitle(title)

    return new Promise((res, rej) => {
        decks = {
            ...decks,
            [deck.id]: deck
        }
        res(deck)
    })
}

export function saveCardToDeck (deckId, card) {
    return new Promise((res, rej) => {
        decks = {
            ...decks,
            [deckId] : {
                ...decks[deckId],
                questions: decks[deckId].questions.concat([card])
            }
        }
        res(card)
    })
}