import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class AddContentPanel extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const actions = [
            <FlatButton
              label="Add"
              primary={true}
              onClick={this.props.handleOpen}
            />,
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.props.handleClose}
            />,
          ];

        return (
        <div> 
            <RaisedButton 
                label="Add content"
                fullWidth="true" 
                onClick={this.props.handleOpen} />
            <Dialog
                title="Add a new content"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleClose}>
                    
                    <TextField
                        id="title"
                        hintText="Content name"
                        fullWidth="true"
                    />
                    
                    <SelectField
                        floatingLabelText="Content Type"
                        value={this.props.value}
                        onChange={this.props.handleChange}
                        fullWidth="true"
                    >
                        <MenuItem value="img" primaryText="Image" />
                        <MenuItem value="img_url" primaryText="Web Image" />
                        <MenuItem value="video" primaryText="Video" />
                        <MenuItem value="web" primaryText="External page" />
                    </SelectField>
                    
                    <TextField
                        id="url"
                        hintText="Content URL"
                        fullWidth="true"
                    />      
            </Dialog>
        </div>);
    }
}