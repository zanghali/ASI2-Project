import React from 'react';

export default class Visual extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,
            src:this.props.src,
            type:this.props.type,
            title:this.props.title,
            onlyContent:this.props.onlyContent
        }
    }

    render() {

        let result;
        let content;

        //Check the type of the preview file
        switch(this.props.type){
            case 'img':
            case 'img_url':
                content = (
                    <img className="card-img-top" src={this.props.src} alt="" />
                );
                break;
            case 'video':
                content = (
                    <object className="card-img-top" data={this.props.src}>
                        Could not load the content
                    </object>    
                );
                break;
            case 'web':
                content = (
                    <iframe className="card-img-top" src={this.props.src} title="Web preview"></iframe>
                );
                break;
            default:
                content = (
                    <div className="card-img-top">File type not supported</div>
                );
                break;    
        }

        //Check if we need all data
        if(this.state.onlyContent){
            result = (
                <div className="card bg-light" style={{width:'100%'}}>
                    {content}
                </div>
            );
        } else {
            result = (
                // <div className="thumbnail">
                //     <p>TITLE: {this.state.title}</p>
                //     <p>id: {this.state.id}</p>
                //     <p>SRC: {this.state.src}</p>
                //     <p>TYPE: {this.state.type}</p>
                //     {content}
                // </div>
                <div className="card bg-light mb-3" style={{width:'100%'}}>
                    {content}
                    <div className="card-body">
                        <h4 className="card-title">{this.props.title}</h4>
                        <p className="card-text">Source: {this.props.src}</p>
                        <p className="card-text">Type: {this.props.type}</p>
                    </div>
                </div>
            );
        }

        return result;
    }
}