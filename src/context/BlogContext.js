import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;
    case 'edit_blogPost':
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case 'delete_blogPost':
      return state.filter(blogPost => blogPost.id !== action.payload);
    // case 'add_blogPost':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 99999),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogpost');
    //response==[{},{},{}]
    dispatch({type: 'get_blogposts', payload: response.data});
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogpost', {title, content});
    // dispatch({type: 'add_blogPost', payload: {title, content}});
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogpost/${id}`);
    dispatch({type: 'delete_blogPost', payload: id});
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogpost/${id}`, {title, content});

    dispatch({type: 'edit_blogPost', payload: {id, title, content, callback}});
    if (callback) {
      callback();
    }
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
[/*{title: 'TEST POST', content: 'TEST CONTENT', id: 1}*/],
);
