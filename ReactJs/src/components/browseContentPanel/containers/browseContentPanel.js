import React, { Component } from 'react';
import { connect } from 'react-redux';

import Content from '../../common/content/container/Content';
import AddContentPanel from '../components/AddContentPanel';
import {addContent} from '../../../actions';

class BrowseContentPanel extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            type:"img"  
        };
        this.getAllContentRender=this.getAllContentRender.bind(this);
        this.getContentObject=this.getContentObject.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleChangeTitle=this.handleChangeTitle.bind(this);
        this.handleChangeType=this.handleChangeType.bind(this);
        this.handleChangeUrl=this.handleChangeUrl.bind(this);
        this.addContent=this.addContent.bind(this);
    }

    addContent = () => {
        this.handleClose();
        let newContent = {
            title: this.state.title,
            type: this.state.type,
            src:this.state.url
        };
        this.props.dispatch(addContent(newContent));
    };
    
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeType = (event, index, value) => {
        this.setState({type: value});
    }

    handleChangeTitle = (ev) => {
        this.setState({title: ev.target.value});
    }

    handleChangeUrl = (ev) => {
        this.setState({url: ev.target.value});
    }
    
    getContentObject(id){
        let contentListLength = Object.keys(this.props.contentlists).length;
        for(var i=0;i<contentListLength;i++){
            if(this.props.contentlists[i].id === id){
                return this.props.contentlists[i];
            }
        }
        return {};
    }
  
    getAllContentRender(){
        let array_render=[];

        if (this.props.contentlists === undefined)
            return ;
        
        let contentListKeys = Object.keys(this.props.contentlists);    
        let contentListLength = contentListKeys.length;    
        for(var i=0;i<contentListLength;i++){
            // let obj = this.getPartObject(this.props.contentlists[i]);
            let obj = this.props.contentlists[contentListKeys[i]];
            array_render.push(
                <Content
                    key={obj.id}
                    id={obj.id}
                    src={obj.src}
                    type={obj.type}
                    title={obj.title}
                    onlyContent={obj.onlyContent}
                />
            );
        }

        return array_render;
    }
    
    //render function use to update the virtual dom
    render() {
        const display_list= this.getAllContentRender();
        
        return (
            <div>

                {display_list}

                <hr className="my-4" />
                <AddContentPanel
                    addContent={this.addContent}
                    handleOpen={this.handleOpen}
                    handleClose={this.handleClose}
                    handleChangeTitle={this.handleChangeTitle}
                    handleChangeType={this.handleChangeType}
                    handleChangeUrl={this.handleChangeUrl}
                    open={this.state.open}
                    type={this.state.type}
                />
                <div className="my-4" />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        contentlists : state.updateModelReducer.content_map
    }
};

export default connect(mapStateToProps)(BrowseContentPanel);

