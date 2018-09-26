import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';

import { signUpRequest, signInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';

export class MapContainer extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    // binding this to event-handler functions
    // this.onMarkerClick = this.onMarkerClick.bind(this);
    // this.onMapClick = this.onMapClick.bind(this);
  }
    onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const style = {
      width: '100%',
      height: '100%'
    };
    return (
      <Map google={this.props.google} onClick={this.onMapClick}
          style={style}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
          zoom={15}
          onClick={this.onMapClick}
        >
        <Marker onClick={this.onMarkerClick} name={'Current location'} />      
        <InfoWindow onClose={this.onInfoWindowClose} marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(signUpRequest(user)),
    signIn: user => dispatch(signInRequest(user)),
    userProfileFetch: () => dispatch(userProfileFetchRequest()),
  };
};

export default (connect(mapStateToProps, mapDispatchToProps), GoogleApiWrapper({
  apiKey: (process.env.__GAPI_KEY__)
})(MapContainer));