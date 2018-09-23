export const log = (...args) => console.log(...args);
export const logError = (...args) => console.error(...args);
export const renderIf = (test, component) => test ? component : undefined;
export const classToggler = (options) => Object.keys(options).filter(key => !!options[key]).join(' ');

export const userValidation = props => {
    if(!props.userAuth) {
      let { history } = props;
      
      let token = localStorage.token;  
      if(token) {
        props.tokenSignIn(token)
          .then(() => {
            return props.userProfileFetch()
              .catch(() => logError);
          })
          .catch(() => {
            logError;
            if(props.location.pathname !== '/')
              return history.replace('/');
          });
      } else {
        if(props.location.pathname !== '/')
          return history.replace('/');
      }
    }
    return;
  };