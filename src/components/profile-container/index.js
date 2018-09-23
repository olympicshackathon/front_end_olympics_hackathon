import React from 'react';
import { connect } from 'react-redux';

import UserProfileForm from '../userProfile-form';
import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, userProfileUpdateRequest } from '../../actions/userProfile-actions.js';
import { userValidation, logError, formatDate } from './../../lib/util.js';

class ProfileContainer extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount() {
    userValidation(this.props);
  }
  handleProfileUpdate = profile => {
    return this.props.userProfileUpdate(profile)
      .catch(logError);
  };
  render(){
    let profileAction='update';
    let placeholderImage = require('./../helpers/assets/profilePlaceholder.jpeg');
    let profileImage = this.props.userProfile && this.props.userProfile.image ? this.props.userProfile.image : placeholderImage;
    return (
      <div className='profile-container container-outer'>
        <div>
          <div>
            <div className='row'>
              <div className='col-md-8'>
                <div>
                  <div>
                    <UserProfileForm 
                      userProfile={this.props.userProfile} 
                      onComplete={this.handleProfileUpdate}
                      profileAction={profileAction}
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div>
                  <div>
                    <div>
                      <p>{this.props.userProfile.username}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className='container'>
                        <div>
                          <div>
                            <img src={profileImage} />
                          </div>
                          <div>
                            <p>Member Since: {formatDate(this.props.userProfile.createdOn)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
})

let mapDispatchToProps = (dispatch) => ({
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  userProfileUpdate: profile => dispatch(userProfileUpdateRequest(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);