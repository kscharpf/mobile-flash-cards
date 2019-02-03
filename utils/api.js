import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Udacity:MobileFlashCards'
export const CALENDAR_STORAGE_KEY = 'Udacity:MobileFlashCards:Calendar'

export const saveQuizData = async (dateStr, quizData) => {
    fetchQuizDates().then((data) => {
            const currentQuizzes = data[dateStr] || []
            data[dateStr] = [...currentQuizzes, quizData]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}

export const fetchQuizDates = async () => {
    let quizDates = '{}'
    try {
        quizDates = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY) || '{}'
    } catch (error) {
        console.log(error)
    }
    return JSON.parse(quizDates)
}

export const fetchDecks = async () => {
    let decks = '{}'
    try {
        decks = await AsyncStorage.getItem(DECK_STORAGE_KEY) || '{}'
    } catch (error) {
        console.log(error)
    }
    return JSON.parse(decks)
}

export const resetDeckStorage = async (deckId) => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deckId].cards = []
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}

export const saveCard = async ({deckId, card}) => {
    console.log("Entering saveCard with deckId: ", deckId, " card ", card)
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deckId].cards = [...data[deckId].cards, card]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}


export const saveDeck = async ({entry, key}) => {
    console.log("Entering saveDeck with entry: ", entry, " key ", key)
    try {
        await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[key]: entry}))
    } catch (error) {
        console.log("Error in saveDeck: ", error)
    }
    console.log("Exiting saveDeck")
}

export function removeDeckFromStorage(key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}

export function generateUID() {
    return Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substr(2, 15)
}
