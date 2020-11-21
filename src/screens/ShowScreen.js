import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import Icon from 'react-native-vector-icons/EvilIcons';

const ShowScreen = ({navigation}) => {
  //console.log(navigation);
  const {state} = useContext(Context);

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id'),
  );

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit', {id: navigation.getParam('id')})
        }>
        <Icon name="pencil" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default ShowScreen;
