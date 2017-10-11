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
    }

    handleChangeTitle(e){
        this.setState({title:e.target.value});
    }

    handleChangeTxt(e){
        this.setState({txt:e.target.value});
    }

    updateSelectedSlid(){
        const tmpSlid = {
            id:this.props.id,
            title:this.props.title,
            txt:this.props.txt,
            content:this.props.content
        };
        this.props.dispatch(setSelectedSlid(tmpSlid));
    }

    getContentObject(id){
        let contentListLength = Object.keys(this.props.contentMap).length;
        for(var i=0;i<contentListLength;i++){
            if(Number.parseInt(this.props.contentMap[i].id, 10) === Number.parseInt(id, 10)){
                return this.props.contentMap[i];
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
                    <div onClick={()=>this.updateSelectedSlid()}>
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