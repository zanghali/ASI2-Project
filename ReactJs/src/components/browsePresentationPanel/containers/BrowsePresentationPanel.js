import React, { Component } from 'react';
import EditSlidPanel from '../../editSlidPanel/containers/EditSlidPanel';

import { connect } from 'react-redux';

class BrowsePresentationPanel extends Component{
    //class constructor whith given properties
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    //render function use to update the virtual dom
    render() {
        
        return (
            <div>
                <EditSlidPanel
                    
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        contentMap : state.updateModelReducer.content_map
    }
};

//export the current classes in order to be used outside
export default connect(mapStateToProps)(BrowsePresentationPanel);
