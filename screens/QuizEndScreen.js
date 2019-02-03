import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from '../components/TextButton'

class QuizEndScreen extends Component {

    onRestart = () => {
        this.props.navigation.navigate(
            'Question',
            {
                questionIndex: 0,
                correctAnswers: 0,
                deckId: this.props.navigation.state.params.deckId
            })
    }

    onHome = () => {
        this.props.navigation.navigate(
            'Deck',
            {
                entryId: this.props.navigation.state.params.deckId
            }
        )
    }

    render() {

        const {title, totalQuestions, navigation} = this.props
        const {correctAnswers} = navigation.state.params
        return (
            <View style={{flex: 1}}>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>Quiz End!</Text>
                    <Text style={styles.textStyle}>{title}</Text>
                    <Text style={styles.textStyle}>You answered {correctAnswers} out of {totalQuestions}</Text>
                    <Text style={styles.textStyle}>Your
                        score: {Math.round(correctAnswers / totalQuestions * 100 * 100 / 100).toFixed(2)}%</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextButton style={styles.buttonStyle} onPress={this.onRestart}>Restart Quiz</TextButton>
                    <TextButton style={styles.buttonStyle} onPress={this.onHome}>Go to Deck Home</TextButton>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 28
    },
    buttonStyle: {
        color: 'white',
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10.0,
        borderWidth: 1.0,
        width: 160,
    }
})

function mapStateToProps({decks}, {navigation}) {
    const {deckId} = navigation.state.params
    return {
        title: decks[deckId].title,
        totalQuestions: decks[deckId].cards.length
    }

}

export default connect(mapStateToProps)(QuizEndScreen)

