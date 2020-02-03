import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

const ScreenDimension = Dimensions.get('screen').width;

import image from './assets/images/paisagem-01.jpg';

const App: () => React$Node = () => {
  const photos = [
    {id: 1, user: 'rafael'},
    {id: 2, user: 'pedro'},
    {id: 3, user: 'eugenio'},
  ];
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {photos.map(photo => (
            <View key={photo.id}>
              <View style={styles.profileWrapper}>
                <Image source={image} style={styles.profileImage} />
                <Text>{photo.user}</Text>
              </View>
              <Image source={image} style={styles.postImage} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  profileWrapper: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginRight: 10,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  postImage: {
    height: ScreenDimension,
    width: ScreenDimension,
  },
});

export default App;
