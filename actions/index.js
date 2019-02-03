
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const RESET_DECK = 'RESET_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_QUIZ_HISTORY = 'RECEIVE_QUIZ_HISTORY'
export const SAVE_QUIZ = 'SAVE_QUIZ'

export function handleSaveQuiz(date, quiz) {
    return {
        type: SAVE_QUIZ,
        date,
        quiz,
    }
}

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function receiveQuizHistory(quizzes) {
    return {
        type: RECEIVE_QUIZ_HISTORY,
        quizzes,
    }
}
export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function handleResetDeck(deckId) {
    return {
        type: RESET_DECK,
        deckId,
    }
}

export function handleRemoveDeck(deckId) {
    return {
        type: REMOVE_DECK,
        deckId,
    }
}

export function addCard(deckId, card) {
    return {
        type: ADD_CARD,
        deckId,
        card,
    }
}