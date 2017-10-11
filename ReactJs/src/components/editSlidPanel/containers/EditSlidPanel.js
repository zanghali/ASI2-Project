import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slid from '../../common/slid/containers/Slid';

class EditSlidPanel extends Component{
    //class constructor whith given properties
    constructor(props) {
        super(props);
        this.state = {};
        this.createSlid = this.createSlid.bind(this);
    }

    createSlid(){
        let newSlid = '';
        newSlid = (<Slid
                    id={this.props.selected_slid.id}
                    title={this.props.selected_slid.title}
                    txt={this.props.selected_slid.txt}
                    content={this.props.selected_slid.content}
                    contentMap={this.props.contentMap}
                    displayMode="FULL_MNG"
        />);
        return newSlid;            
    }

    //render function use to update the virtual dom
    render() {
        
        if(this.props.selected_slid.id === undefined)
            return '';
        else{
            return this.createSlid();
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected_slid : state.selectedReducer.slid
    }
};

export default connect(mapStateToProps)(EditSlidPanel);

