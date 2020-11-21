import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext';
import BlogpostForm from '../components/BlogPostForm';

const ShowScreen = ({navigation}) => {
  const {addBlogPost} = useContext(Context);
  return (
    <BlogpostForm
      onSubmit={(title, content) => {
        addBlogPost(title, content, () => navigation.navigate('Index'));
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default ShowScreen;
