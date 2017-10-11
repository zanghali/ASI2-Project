import React, { Component } from 'react';
import EditSlidPanel from '../../editSlidPanel/containers/EditSlidPanel';

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
                    contentMap={this.props.contentMap}
                />
            </div>
        );
    }
}


//export the current classes in order to be used outside
export default BrowsePresentationPanel;
