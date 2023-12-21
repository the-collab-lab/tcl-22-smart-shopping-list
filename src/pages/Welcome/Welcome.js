import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import CreateOrJoin from '../../components/CreateOrJoin';
import ShareToken from '../../components/ShareToken';
import { StyledWrapper } from './elements';
import './welcomeStyles.css';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      joinList: false,
    };
    this.toggleJoinList = this.toggleJoinList.bind(this);
  }
  toggleJoinList() {
    this.setState({
      joinList: true,
    });
  }

  render() {
    if (!this.state.joinList) {
      return (
        <div className="welcomeScreen">
          <StyledWrapper>
            <CreateOrJoin updateToken={this.props.updateToken} />
            <Button
              color="primary"
              type="button"
              variant="contained"
              onClick={this.toggleJoinList}
            >
              Join existing list
            </Button>
          </StyledWrapper>
        </div>
      );
    } else {
      return (
        <div className="welcomeScreen">
          <StyledWrapper>
            <ShareToken updateToken={this.props.updateToken} />
          </StyledWrapper>
        </div>
      );
    }
  }
}
// };

export default Welcome;
