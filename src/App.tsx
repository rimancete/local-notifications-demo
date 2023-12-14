import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

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
