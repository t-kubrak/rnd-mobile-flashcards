import {AsyncStorage} from "react-native";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const NOTIFICATION_KEY = 'notifyQuiz'

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Notifications.getPermissionsAsync().then((status) => {
                    console.log(status);
                    if (status.granted) {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate()+1)
                        tomorrow.setHours(18)
                        tomorrow.setMinutes(0)

                        Notifications.scheduleNotificationAsync(
                            {
                                content: {
                                    title: "Quiz time! 📖",
                                    body: "Don't forget to do the quiz today.",
                                },
                                trigger: tomorrow,
                                repeat: 'day',
                            }
                        )

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}