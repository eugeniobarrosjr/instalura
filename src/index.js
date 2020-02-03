import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import Post from './components/Post';

class App extends Component {
  state = {
    photos: [],
  };

  componentDidMount(): void {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(response => response.json())
      .then(json => this.setState({photos: json}));
  }

  render() {
    const {photos} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {photos.map(photo => (
              <Post key={photo.id} photo={photo} />
            ))}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
