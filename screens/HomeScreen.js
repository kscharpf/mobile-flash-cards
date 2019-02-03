import React, { Component } from 'react'
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fetchDecks, fetchQuizDates } from '../utils/api'
import { receiveDecks, receiveQuizHistory } from '../actions'
import { AppLoading } from 'expo'
import { white } from '../utils/colors'
import { connect } from 'react-redux'
import { timeToString } from '../utils/helpers'

class HomeScreen extends Component {

    state = {
        ready: false,
    }

    renderItem = (item) => {
        const {id, title, cards} = item.item
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => this.props.navigation.navigate(
                    'Deck',
                    {
                        entryId: id,
                    })}
            >
                < View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 28}}>{title}</Text>
                    <Text style={{fontSize: 18}}>{cards.length} cards</Text>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        const {dispatch} = this.props
        fetchDecks().then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ready: true})))
        fetchQuizDates().then((quizDates) => dispatch(receiveQuizHistory(quizDates)))
    }


    render() {

        if (!this.state.ready) {
            return <AppLoading/>
        }


        const {decks, quizzes} = this.props

        const deckList = (decks === null || decks === undefined || Object.keys(decks).length === 0) ?
            <View>
                <Text style={{fontSize: 24}}>You don't have any decks defined!</Text>
            </View>
            :
            <FlatList
                data={Object.values(decks)}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
            />

        console.log("quizzes: ", quizzes)
        const warning = (quizzes && Object.keys(quizzes).includes(timeToString())) ? <View></View> :
            <Text style={{fontSize:28, color: 'red'}}>You haven't taken any quizzes today</Text>

        return (
            <View style={styles.home}>
                {warning}
                {deckList}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 10,
        borderWidth: 1.0,
        borderColor: 'black',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
})

function mapStateToProps({decks, quizzes}) {
    return {
        decks,
        quizzes,
    }
}

export default connect(mapStateToProps)(HomeScreen)
