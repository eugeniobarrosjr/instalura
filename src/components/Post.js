import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import emptyLike from '../assets/images/s2.png';
import like from '../assets/images/s2-check.png';
import send from '../assets/images/send.png';

const ScreenDimension = Dimensions.get('screen').width;

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: this.props.photo,
      valorComentado: '',
    };
  }

  loadIcon(likeada) {
    return likeada ? like : emptyLike;
  }

  like = () => {
    const {photo} = this.state;
    let novaLista = [];
    if (!photo.likeada) {
      novaLista = [...photo.likers, {login: 'meuUsuario'}];
    } else {
      novaLista = photo.likers.filter(liker => {
        return liker.login !== 'meuUsuario';
      });
    }

    const updatedPhoto = {
      ...this.state.photo,
      likeada: !photo.likeada,
      likers: novaLista,
    };

    this.setState({
      photo: updatedPhoto,
    });
  };

  adicionaComentario = () => {
    if (this.state.valorComentado === '') {
      return;
    }
    const novaLista = [
      ...this.state.photo.comentarios,
      {
        id: this.state.valorComentado,
        login: 'meuUsuario',
        texto: this.state.valorComentado,
      },
    ];
    const fotoAtualizada = {
      ...this.state.photo,
      comentarios: novaLista,
    };

    this.setState({
      photo: fotoAtualizada,
      valorComentado: '',
    });

    this.inputComentario.clear();
  };

  renderLikes(likers) {
    if (likers.length <= 0) {
      return;
    }

    return (
      <Text>
        {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
      </Text>
    );
  }

  renderLegend(photo) {
    if (photo.comentario === '') {
      return;
    }

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{photo.loginUsuario}</Text>
        <Text>{photo.comentario}</Text>
      </View>
    );
  }

  render() {
    const {photo} = this.state;
    return (
      <View>
        <View style={styles.profileWrapper}>
          <Image source={{uri: photo.urlPerfil}} style={styles.profileImage} />
          <Text>{photo.loginUsuario}</Text>
        </View>
        <Image source={{uri: photo.urlFoto}} style={styles.postImage} />
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.like} activeOpacity={0.7}>
            <Image
              style={styles.likeButton}
              source={this.loadIcon(photo.likeada)}
            />
          </TouchableOpacity>

          {this.renderLikes(photo.likers)}
          {this.renderLegend(photo)}

          {photo.comentarios.map(comentario => (
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          ))}

          <View style={styles.novoComentario}>
            <TextInput
              style={styles.input}
              onChangeText={texto => this.setState({valorComentado: texto})}
              ref={input => {
                this.inputComentario = input;
              }}
              placeholder="Adicione um comentário.."
            />
            <TouchableOpacity
              onPress={this.adicionaComentario}
              activeOpacity={0.7}>
              <Image style={styles.icone} source={send} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

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
  likeButton: {
    height: 25,
    width: 25,
    marginBottom: 10,
  },
  footer: {
    margin: 10,
  },
  likes: {
    fontWeight: 'bold',
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  comentario: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 40,
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icone: {
    width: 30,
    height: 30,
  },
});

export default Post;
