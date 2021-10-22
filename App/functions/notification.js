import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log('LOCAL NOTIFICATION ==>', notification);
      handleNotification(notification)
    },
  
    popInitialNotification: true,
    requestPermissions: true
})

function handleNotification(notif){
    let isBackground = notif.foreground;
    if(isBackground == true){
      console.log("wewwewewew" + notif)
    }
}

export const LocalNotification = () => {
    PushNotification.localNotification({
      autoCancel: true,
      title: 'APresto: Alert!',
      message: 'A product/reward is out of stock! The item is now delisted.',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default'
    })
}