import React, {useReducer} from 'react';

export default (reducer, actions, initialState) => {
  //reducer===blogReducer // action==={addBlogPost,deleteBlogPost} //initialState===[] myComment
  const Context = React.createContext();

  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //actions === {addBlogPost: {dispatch} => {return () =>{}}}
    const boundActions = {};
    for (let key in actions) {
      // key === 'addBlogPost'
      boundActions[key] = actions[key](dispatch);
      //baundAction.addBlogPost=action.addBlogPost(dispatch);
    }
    return (
      <Context.Provider value={{state, ...boundActions}}>
        {/* addBlogPost wage action wenuwata,okktma podu ekk vidiyata boundActions use karai */}
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider};
};
