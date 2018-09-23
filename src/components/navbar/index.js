import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../actions/userAuth-actions.js';
import { classToggler, renderIf } from '../../lib/util.js';


class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state={ visible: false, intro: false};
  }
  componentWillMount() {
    this.tokenCheck();
  }
  tokenCheck = () => {
    if(!this.props.userAuth) {
      let token = localStorage.token;  
      if(!token) this.setState({ introNav: true })
    }
    else {
      this.setState({ intro: false })
    }
  };
  handleSignOut = () => {
    this.props.signOut();
    this.props.history.push('/');
  };
  render() {
    return (
      <header className={classToggler({
        'navbar': true,
        'introNavbar': !this.props.userAuth,
      })}>
        <nav>
          <ul className='socials'>
            <li className='social dropdown'>
              {renderIf(this.props.userAuth,
                <div>
                  <div className='avatarDiv' onClick={() => this.setState({ visible: !this.state.visible })} >
                  </div>
                  <div className={ this.state.visible ? 'slideIn dropdownDiv' : 'slideOut dropdownDiv' }>
                    <p className='logout link' onClick={this.handleSignOut}>logout</p>
                  </div>
                </div>
              )}
            </li>
            <li className='social'>
              <a href="https://github.com/brianbixby" rel="noopener noreferrer" target="_blank"><span></span> github</a>
            </li>
            <li className='social'>
              <a href="https://www.linkedin.com/in/brianbixby1/" rel="noopener noreferrer" target="_blank"><span></span>linked in</a>
            </li>
          </ul>
        </nav>
    </header>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);