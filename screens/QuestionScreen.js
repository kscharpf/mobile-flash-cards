import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import TextButton from '../components/TextButton'
import { saveQuizData} from '../utils/api'
import { connect } from 'react-redux'
import { timeToString } from '../utils/helpers'
import { handleSaveQuiz} from '../actions'

class QuestionScreen extends Component {
    state = {
        viewAnswer: false,
    }

    nextQuestion(isCorrect) {
        const {questionIndex, correctAnswers, deckId} = this.props.navigation.state.params
        const newCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0)
        if(questionIndex < this.props.totalQuestions-1) {
            this.props.navigation.push('Question',
                {questionIndex: questionIndex+1,
                    deckId: deckId,
                    correctAnswers: newCorrectAnswers})

        } else {
            const ts = timeToString()
            const qd = {
                deckId: deckId,
                correctAnswers: newCorrectAnswers,
                totalQuestions: this.props.totalQuestions,
            }
            saveQuizData(ts, qd)
            this.props.dispatch(handleSaveQuiz(ts, qd))
            this.props.navigation.push('QuizEnd',
                {correctAnswers: newCorrectAnswers,
                    deckId: deckId})

        }
    }

    onCorrect = () => {
        this.nextQuestion(true)
    }

    onIncorrect = () => {
        this.nextQuestion(false)
    }

    render() {
        const {questionIndex} = this.props.navigation.state.params
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 28}}>{this.props.card.question}</Text>
                {!this.state.viewAnswer ?
                    <TextButton style={{fontSize: 20, color: 'red', backgroundColor: 'white', marginTop: 20, marginBottom: 20}}
                                onPress={() => this.setState({viewAnswer: true})}
                    >
                        View Answer
                    </TextButton>
                    :
                    <Text style={{fontSize: 20}}>{this.props.card.answer}</Text>
                }
                <Text>Was your answer correct?</Text>
                <TextButton
                    style={[styles.buttonStyle, {backgroundColor: 'green', color: 'white'}]}
                    onPress={this.onCorrect}>
                    CORRECT
                </TextButton>
                <TextButton
                    style={[styles.buttonStyle, {backgroundColor: 'red', color: 'white'}]}
                    onPress={this.onIncorrect}>
                    INCORRECT
                </TextButton>
                <Text style={{fontSize: 20}}>Progress: {this.props.totalQuestions - questionIndex - 1} cards remaining</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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

    const {deckId, questionIndex} = navigation.state.params
    return {
        card: decks[deckId].cards[questionIndex],
        totalQuestions: decks[deckId].cards.length
    }
}

export default connect(mapStateToProps)(QuestionScreen)