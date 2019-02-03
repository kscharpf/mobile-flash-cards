import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const NOTIFICATION_KEY = "Udacity:MobileFlashCards:notification"

// function provided by UdaciFitness example problem
export function timeToString(time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}

// Duplicate of function demonstrated in UdaciFitness example
export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

// Duplicate of function demonstrated in UdaciFitness example
function createNotification() {
    return {
        title: "Time to Study Flash Cards",
        body: "Study every day!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            vibrate: true,
            sticky: false,
            priority: 'high',
        },
    }
}

// Duplicate of function demonstrated in UdaciFitness example
export function setLocalNotification(days=1, hours=20, minutes=0) {
    console.log("Entered setLocalNotification with ", days, " ", hours, " ", minutes)
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()

                            tomorrow.setDate(tomorrow.getDate() + days)
                            tomorrow.setHours(hours)
                            tomorrow.setMinutes(minutes)
                            console.log("next notification: ", tomorrow)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                            console.log("Notification scheduled")
                        } else {
                            console.log("Permission not granted for notification")
                        }
                    })
            }
        })
}

