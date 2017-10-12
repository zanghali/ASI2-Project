import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from '../../common/content/container/Content';

class BrowseContentPanel extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);
        this.state = {};
        this.getAllContentRender=this.getAllContentRender.bind(this);
        this.getContentObject=this.getContentObject.bind(this);
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
        
        let contentListLength = Object.keys(this.props.contentlists).length;    
        for(var i=0;i<contentListLength;i++){
            // let obj = this.getPartObject(this.props.contentlists[i]);
            let obj = this.props.contentlists[i];
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
            <div className="jumbotron">
                <h2 className="display-4">Content</h2>
                <p className="lead">Drag and drop files into your presentation</p>
                <hr className="my-4" />
                {display_list}
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

