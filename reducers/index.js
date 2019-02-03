import {ADD_CARD, REMOVE_DECK, RESET_DECK, ADD_DECK, RECEIVE_DECKS, RECEIVE_QUIZ_HISTORY, SAVE_QUIZ} from '../actions'

function deck(state = {}, action) {
    switch (action.type) {

        case SAVE_QUIZ:
            const currentQuizzes = state.quizzes[action.date] || []
            return { 
                ...state,
                quizzes: {
                    ...state.quizzes,
                    [action.date]: [...currentQuizzes, action.quiz],
                }
            }

        case ADD_CARD:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deckId]: {
                        ...state.decks[action.deckId],
                        cards: [...state.decks[action.deckId].cards, action.card],
                    }
                }
            }

        case ADD_DECK:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deck.id]: action.deck,
                },
            }

        case REMOVE_DECK:
            const {decks, quizzes} = state
            const {[action.deckId]: deckValue, ...remainder} = decks
            return {
                quizzes: quizzes,
                decks: remainder
            }

        case RESET_DECK:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deckId]: {
                        ...state.decks[action.deckId],
                        cards: [],
                    }
                }
            }

        case RECEIVE_DECKS:
            return {
                ...state,
                decks: {
                    ...action.decks,
                }
            }

        case RECEIVE_QUIZ_HISTORY:
            return {
                ...state,
                quizzes: {
                   ...action.quizzes
                }
            }


        default:
            return state
    }

}

export default deck
