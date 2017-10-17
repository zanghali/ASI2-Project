import React from 'react';

import EditMetaSlid from '../components/EditMetaSlid';
import Visual from '../../content/components/Visual';

import './slid.css';

import { connect } from 'react-redux';
import {setSelectedSlid} from '../../../../actions';

class Slid extends React.Component{

    constructor(props) {
        super(props);
        this.getContentObject=this.getContentObject.bind(this);
        this.getDisplayRender=this.getDisplayRender.bind(this);
        this.handleChangeTitle=this.handleChangeTitle.bind(this);
        this.handleChangeTxt=this.handleChangeTxt.bind(this);
        this.updateSelectedSlid=this.updateSelectedSlid.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.drop = this.drop.bind(this);
    }

    allowDrop(ev){
        ev.preventDefault();
    }

    drop(ev){
        ev.preventDefault();
        let newContent = JSON.parse(ev.dataTransfer.getData("application/json"));
        this.props.updateSlid(this.props.id,this.props.title,this.props.txt,newContent.id);
    }

    handleChangeTitle(e){
        this.props.updateSlid(this.props.id,e.target.value,this.props.txt,this.props.content);
    }

    handleChangeTxt(e){
        this.props.updateSlid(this.props.id,this.props.title,e.target.value,this.props.content);
    }

    updateSelectedSlid(){
        const tmpSlid = {
            id:this.props.id,
            title:this.props.title,
            txt:this.props.txt,
            content:this.props.content,
            content_id:this.props.content
        };
        this.props.dispatch(setSelectedSlid(tmpSlid));
    }

    getContentObject(id){
        let contentListKeys = Object.keys(this.props.contentMap)
        let contentListLength = contentListKeys.length;
        for(var i=0;i<contentListLength;i++){
            if(Number.parseInt(this.props.contentMap[contentListKeys[i]].id, 10) === Number.parseInt(id, 10)){
                return this.props.contentMap[contentListKeys[i]];
            }
        }
        return {};
    }

    getDisplayRender(displayMode){
        let contentObj = this.getContentObject(this.props.content); 
        let slideRender = '';

        switch(displayMode){
            case "SHORT":
                slideRender = (
                    <div className="card bg-light mb-3" onClick={(e)=>this.updateSelectedSlid()}>
                        <div className="card-body">
                            <h2 className="card-title">{this.props.title}</h2>
                            <h4 className="card-subtitle mb-4 text-muted">{this.props.txt}</h4>
                            <Visual
                                id={contentObj.id}
                                src={contentObj.src}
                                type={contentObj.type}
                                title={contentObj.title}
                                onlyContent={true}
                            />
                        </div>
                    </div>
                );
                return slideRender;
            case "FULL_MNG":
                slideRender = (
                    <div onDragOver={this.allowDrop} onDrop={this.drop}>
                        <div className="card bg-light mb-3">
                            <div className="card-body">
                                <h2 className="card-title">{this.props.title}</h2>
                                <h4 className="card-subtitle mb-4 text-muted">{this.props.txt}</h4>
                                <Visual
                                    id={contentObj.id}
                                    src={contentObj.src}
                                    type={contentObj.type}
                                    title={contentObj.title}
                                    onlyContent={true}
                                />
                            </div>
                        </div>
                        <div className="card bg-light mb-3" style={{width:'100%'}}>
                            <div className="card-body">
                                <h3 className="card-title">MetaData</h3>
                                <EditMetaSlid
                                    title={this.props.title}
                                    txt={this.props.txt}
                                    handleChangeTitle={this.handleChangeTitle}
                                    handleChangeTxt={this.handleChangeTxt}
                                />
                            </div>
                        </div>
                    </div>
                );
                return slideRender;
            default:
                slideRender = (
                    <div className="card bg-light mb-3" style={{width:'100%'}}>
                        <div className="card-body">
                            <h2 className="card-title">Error while loading the slide</h2>
                        </div>
                    </div>
                );
                return slideRender;
        }
    }

    render() {
        return this.getDisplayRender(this.props.displayMode);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        contentMap : state.updateModelReducer.content_map
    }
};


export default connect(mapStateToProps)(Slid);