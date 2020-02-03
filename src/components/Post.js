import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const ScreenDimension = Dimensions.get('screen').width;

const Post = ({photo}) => {
  return (
    <View>
      <View style={styles.profileWrapper}>
        <Image source={{uri: photo.urlPerfil}} style={styles.profileImage} />
        <Text>{photo.loginUsuario}</Text>
      </View>
      <Image source={{uri: photo.urlFoto}} style={styles.postImage} />
    </View>
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

export default Post;
