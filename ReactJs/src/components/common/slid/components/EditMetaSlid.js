import React from 'react';

import TextField from 'material-ui/TextField';

export default class EditMetaSlid extends React.Component{

    render(){

        return(
            <div>
                <TextField
                    hintText="Title"
                    floatingLabelText="Title"
                    fullWidth={true}
                    value={this.props.title}
                    onChange={(event, newValue) => this.props.handleChangeTitle(newValue)}
                />
                <TextField
                    hintText="Text"
                    floatingLabelText="Text"
                    fullWidth={true}
                    multiLine={true}
                    rows={2}
                    value={this.props.txt}
                    onChange={(event, newValue) => this.props.handleChangeTxt(newValue)}
                />
            </div>
        );

    }
}