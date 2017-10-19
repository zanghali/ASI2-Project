import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class AddSlidePanel extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const actions = [
            <FlatButton
              label="Add"
              primary={true}
              onClick={this.props.handleAddSlide}
            />,
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.props.handleAddClose}
            />,
          ];

        return (
        <div> 
            <Dialog
                title="Add a new slide"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleAddClose}>
                    
                    <TextField
                        id="title"
                        hintText="Slide name"
                        fullWidth={true}
                        onChange={this.props.handleChangeTitleSlide}
                    />
                    
                    <TextField
                        id="txt"
                        hintText="Slide text"
                        fullWidth={true}
                        multiLine={true}
                        onChange={this.props.handleChangeDescriptionSlide}
                    />      
            </Dialog>
        </div>);
    }
}