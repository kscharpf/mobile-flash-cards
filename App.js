import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import DeckScreen from './screens/DeckScreen'
import AddDeckScreen from './screens/AddDeckScreen'
import AddQuizCard from './screens/AddQuizCard'
import QuestionScreen from './screens/QuestionScreen'
import QuizEndScreen from './screens/QuizEndScreen'
import {
    createAppContainer,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createStackNavigator
} from 'react-navigation'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'


function UdaciStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const RouteConfigs = {
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Home",
        }
    },
    AddEntry: {
        screen: AddDeckScreen,
        navigationOptions: {
            tabBarLabel: "Add Deck",
        }
    },
}

const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? white : purple,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
}

const TabNavigators =
    Platform.OS === "ios"
        ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
        : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)
const Tabs = createAppContainer(TabNavigators)

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null,
        },
    },
    Deck: {
        screen: DeckScreen,
        navigationOptions: ({navigation}) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
        }),
    },
    AddQuestion: {
        screen: AddQuizCard,
    },
    Question: {
        screen: QuestionScreen,
    },
    QuizEnd: {
        screen: QuizEndScreen,
    }
})

const Main = createAppContainer(MainNavigator)

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <UdaciStatusBar/>
                <Main/>
            </Provider>
        )
    }
}

