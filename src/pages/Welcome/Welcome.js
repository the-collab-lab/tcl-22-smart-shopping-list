import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import CreateOrJoin from '../../components/CreateOrJoin';
import ShareToken from '../../components/ShareToken';

// const Welcome = (props) => {
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
        <div>
          <CreateOrJoin updateToken={this.props.updateToken} />
          <Button
            color="primary"
            type="button"
            variant="contained"
            onClick={this.toggleJoinList}
          >
            Join existing list
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <ShareToken updateToken={this.props.updateToken} />
        </div>
      );
    }
  }
}
// };

export default Welcome;
