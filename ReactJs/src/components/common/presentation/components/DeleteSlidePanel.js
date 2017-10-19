import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class DeleteSlidePanel extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.props.handleDeleteClose}
            />,
            <FlatButton
              label="Delete"
              primary={true}
              onClick={this.props.handleDelete}
            />,
          ];
      
          return (
            <div>
              <Dialog
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleDeleteClose}
              >
                Are you sure you want to delete the current slide?
              </Dialog>
            </div>
          );
    }
}