import React from 'react'
import { Text, View } from 'react-native'
import TextButton from '../components/TextButton'
import { lightPurp, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

const NotificationTest = (props) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 24, color: 'red', padding: 20}}>
                Force the notification to expire at the beginning of the following minute
            </Text>
            <TextButton
                style={{color: white, backgroundColor: lightPurp, fontSize: 24}}
                disabled={false}
                onPress={() => {
                    let d = new Date()
                    d.setMinutes(d.getMinutes() + 1)
                    clearLocalNotification().then
                    (setLocalNotification(0, d.getHours(), d.getMinutes()))

                    props.navigation.goBack()
                }}
            >
                Set Immediate Notification
            </TextButton>
        </View>
    )
}
export default NotificationTest