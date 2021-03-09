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

export function getDecks () {
    return new Promise((res, rej) => {
        res({...decks})
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