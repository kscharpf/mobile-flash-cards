import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import TextButton from '../components/TextButton'
import { removeDeckFromStorage, resetDeckStorage } from '../utils/api'
import { handleRemoveDeck, handleResetDeck } from '../actions'

class DeckScreen extends Component {

    removeDeck(id) {
        this.props.navigation.navigate('Home')
        removeDeckFromStorage(id)
        this.props.dispatch(handleRemoveDeck(id))
    }

    startQuiz(id) {
        this.props.navigation.navigate('Question',
            {
                questionIndex: 0,
                correctAnswers: 0,
                deckId: id
            }
        )
    }

    addCard(id) {
        this.props.navigation.navigate('AddQuestion',
            {deckId: id})
    }

    resetDeck(id) {
        this.props.dispatch(handleResetDeck(id))
        resetDeckStorage(id)
    }

    render() {
        const {card} = this.props
        let view =
            <View>
                <Text>Deck not defined</Text>
            </View>

        if (card !== null && card !== undefined) {
            view =
                <View style={{flex: 1}}>
                    <View style={{flex: 2, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text style={{fontSize: 32}}>{card.title}</Text>
                        <Text style={{fontSize: 18}}>{card.cards.length} cards</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TextButton disabled={card.cards.length === 0} onPress={() => this.startQuiz(this.props.id)}
                                    style={[styles.buttonStyle, {backgroundColor: 'black', color: 'white'}]}>START
                            QUIZ</TextButton>
                        <TextButton disabled={false} onPress={() => this.addCard(this.props.id)}
                                    style={[styles.buttonStyle, {backgroundColor: 'white', color: 'black'}]}>ADD
                            CARD</TextButton>
                        <TextButton disabled={false} onPress={() => this.removeDeck(this.props.id)}
                                    style={[styles.buttonStyle, {backgroundColor: 'red', color: 'white'}]}>REMOVE
                            DECK</TextButton>
                        <TextButton disabled={false} onPress={() => this.resetDeck(this.props.id)}
                                    style={[styles.buttonStyle, {backgroundColor: 'green', color: 'white'}]}>
                            REMOVE ALL CARDS
                        </TextButton>
                    </View>
                </View>
        }
        return view
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10.0,
        borderWidth: 1.0,
        width: 160,
    }
})

function mapStateToProps({decks}, {navigation}) {
    const {entryId} = navigation.state.params
    const id = entryId

    return (
        {
            id,
            card: decks[id],
        }
    )
}

export default connect(mapStateToProps)(DeckScreen)