import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, userProfileUpdateRequest } from '../../actions/userProfile-actions.js';
import { logError, renderIf } from './../../lib/util.js';

class LandingContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { }
  }
  
  render() {
    return (
      <section className='temp'>
        <p> hi</p>
      </section>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => ({
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  userProfileUpdate: profile => dispatch(userProfileUpdateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);