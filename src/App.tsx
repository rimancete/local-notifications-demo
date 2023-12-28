import { useEffect } from 'react';
import { StyleSheet, View, Button, Alert, Platform } from 'react-native';
import * as Device from 'expo-device';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

async function configurePushNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const settings = await Notifications.getPermissionsAsync();

    let finalStatus = settings.status;

    if (settings.status !== 'granted') {
      const { status: requestStatus } = await Notifications.requestPermissionsAsync();
      finalStatus = requestStatus;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission required', 'Push notifictions need the appropriate permissions.');
      return;
    }
    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });
    console.log('pushToken', pushTokenData);
  } else {
    Alert.alert('Fisical device required', 'Push notifications use fisical device');
  }
}

export default function App() {
  useEffect(() => {
    configurePushNotifications();
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

  const sendPushNotificationHAndler = async () => {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[yNOas5NSWVLjl7NExnX2tQ]',
        sound: 'default',
        title: 'Push Notification teste',
        body: 'This is a teste',
      }),
    });
  };
  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
      <Button title="Send Push Notification" onPress={sendPushNotificationHAndler} />
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
