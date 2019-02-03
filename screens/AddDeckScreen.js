import React, {Component} from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import {addDeck} from '../actions'
import {generateUID, saveDeck} from '../utils/api'
import TextButton from '../components/TextButton'
import {lightPurp, white} from '../utils/colors'
import Input from '../components/Input'
import { connect } from 'react-redux'
import { Constants } from 'expo'


class AddDeckScreen extends Component {
    state = {
        text: '',
    }

    onChange = (text) => {
        this.setState({text})
    }


    submit() {

        const deck = {id: generateUID(), title: this.state.text, cards: []}
        this.props.dispatch(addDeck(deck))

        saveDeck({key: deck.id, entry: deck})

        this.setState({text: ''})
        this.props.navigation.navigate('Deck',
            {entryId: deck.id})
    }

    render() {
        const isDisabled = this.state.text === ''
        return (
            <View style={{flex: 1}}>
                <Input placeholder={'New Deck Name'} title={'New Deck Name'} value={this.state.text}
                       onChange={this.onChange}/>
                <TextButton
                    style={{color: white, backgroundColor: isDisabled ? 'lightgrey' : lightPurp, fontSize: 28}}
                    onPress={() => this.submit()} disabled={isDisabled}>SUBMIT</TextButton>
            </View>
        )

    }
}

export default connect()(AddDeckScreen)