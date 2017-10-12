import React, { Component } from 'react';
import EditSlidPanel from '../../editSlidPanel/containers/EditSlidPanel';

import { connect } from 'react-redux';
import {updatePresentation} from '../../../actions';

class BrowsePresentationPanel extends Component{
    //class constructor whith given properties
    constructor(props) {
        super(props);
        this.state = {};
        this.updatePresentation = this.updatePresentation.bind(this);
    }
    
    updatePresentation(newSlid){
        
        let newSlidArray = [];
        let slidListLength = Object.keys(this.props.presentation.slidArray).length;    
        for(var i=0;i<slidListLength;i++){
            if(this.props.presentation.slidArray[i].id === newSlid.id)
                newSlidArray.push(
                    {
                        id: newSlid.id,
                        title: newSlid.title,
                        txt: newSlid.txt,
                        content: newSlid.content_id,
                        content_id: newSlid.content_id
                    }
                );
            else
                newSlidArray.push(
                    {
                        id: this.props.presentation.slidArray[i].id,
                        title: this.props.presentation.slidArray[i].title,
                        txt: this.props.presentation.slidArray[i].txt,
                        content: this.props.presentation.slidArray[i].content_id,
                        content_id: this.props.presentation.slidArray[i].content_id
                    }
            ); 
        }
        const tmpPres = {
            id: this.props.presentation.id,
            title: this.props.presentation.title,
            description: this.props.presentation.description,
            slidArray: newSlidArray
        }
        this.props.dispatch(updatePresentation(tmpPres));
    }

    //render function use to update the virtual dom
    render() {
        
        return (
            <div>
                <EditSlidPanel
                    updatePresentation={this.updatePresentation}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        presentation : state.updateModelReducer.presentation
    }
};

//export the current classes in order to be used outside
export default connect(mapStateToProps)(BrowsePresentationPanel);
