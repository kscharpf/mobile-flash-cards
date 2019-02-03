import React, { Component } from 'react'
import {Text, View} from 'react-native'
import Input from '../components/Input'
import TextButton from '../components/TextButton'
import { lightPurp, white } from '../utils/colors'
import { generateUID, saveCard } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'


class AddQuizCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    onPress = () => {
        const card = {id: generateUID(), question: this.state.question, answer: this.state.answer}
        const { deckId } = this.props.navigation.state.params

        this.props.dispatch(addCard(deckId, card))

        saveCard({deckId, card})

        this.setState({text: ''})
        this.props.navigation.goBack()
    }

    onQuestionChange = (text) => {
        this.setState({question: text})
    }
    onAnswerChange = (text) => {
        this.setState({answer: text})
    }

    onHome = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        const { question, answer } = this.state
        const isDisabled = question === '' || answer === ''

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{flex: 1}}>
                    <Input placeholder={'What is your question?'} title={'Question'} value={question}
                           onChange={this.onQuestionChange} style={{borderWidth: 0.0}}/>
                    <Input placeholder={'Answer'} title={'Answer'} value={answer}
                           onChange={this.onAnswerChange} style={{borderWidth: 0.0}}/>
                    <TextButton
                        style={{color: white, backgroundColor: lightPurp, fontSize: 24}}
                        disabled={isDisabled}
                        onPress={this.onPress}
                    >
                        SUBMIT QUESTION
                    </TextButton>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <TextButton
                        style={{color: white, backgroundColor: lightPurp, fontSize: 24}}
                        onPress={this.onHome}
                    >
                        Home
                    </TextButton>
                </View>
            </View>
        )
    }
}

export default connect()(AddQuizCard)