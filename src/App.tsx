import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('notitication received');
      console.log(notification);
      const { userName } = notification.request.content.data;
      console.log(userName);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('notification reponse received');
        console.log(response);
        const { userName } = response.notification.request.content.data;
        console.log(userName);
      },
    );
    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);
  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notifications',
        body: 'This is the body notification',
        data: { userName: 'Osvaldo' },
      },
      trigger: { seconds: 5 },
    });
  };
  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
