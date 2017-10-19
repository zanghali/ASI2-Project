import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentSave from 'material-ui/svg-icons/content/save';

const style = {
    marginRight: 10
};

export default class CommandButton extends React.Component{

    render(){

        return(
            <div className="my-2">
                <FloatingActionButton mini={true} secondary={true} style={style} onClick={this.props.handleAddOpen}>
                    <ContentAdd />
                </FloatingActionButton>
                <FloatingActionButton mini={true} secondary={true} style={style} onClick={this.props.handleDeleteOpen}>
                    <ContentDelete />
                </FloatingActionButton>
                <FloatingActionButton mini={true} secondary={true} onClick={this.props.handleSnackOpen}>
                    <ContentSave />
                </FloatingActionButton>
            </div>
        );

    }
}