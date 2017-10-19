import React from 'react';

import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';


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
                    <img 
                        className="card-img-top"
                        src={this.props.src}
                        alt=""
                        draggable="true"/>
                );
                break;
            case 'video':
                content = (
                    <object 
                        className="card-img-top"
                        data={this.props.src}
                        draggable="true">
                        Could not load the content
                    </object>    
                );
                break;
            case 'web':
                content = (
                    <iframe
                        className="card-img-top"
                        src={this.props.src}
                        title="Web preview"
                        draggable="true">
                    </iframe>
                );
                break;
            default:
                content = (
                    <div className="card-img-top">File type not supported</div>
                );
                break;    
        }

        //Check if we need all data
        if(this.props.onlyContent){
            // result = (
            //     <div className="card bg-light" style={{width:'100%'}}>
            //         {content}
            //     </div>
            // );
            result = (
                <Card>
                    <CardMedia>
                        {content}
                    </CardMedia>
                </Card>
            );
        } else {
            // result = (
            //     <div className="card bg-light mb-3" style={{width:'100%'}} draggable="true" onDragStart={this.props.drag}>
            //         {content}
            //         <div className="card-body">
            //             <h4 className="card-title">{this.props.title}</h4>
            //             <p className="card-text">Source: {this.props.src}</p>
            //             <p className="card-text">Type: {this.props.type}</p>
            //         </div>
            //     </div>
            // );
            result = (
                <Paper zDepth={1} style={{marginBottom:"10px"}}>
                    <Card draggable="true" onDragStart={this.props.drag}>
                        <CardMedia overlay={<CardTitle title={this.props.title} subtitle={this.props.src}/>}>
                            {content}
                        </CardMedia>
                    </Card>
                </Paper>
            );


        }

        return result;
    }
}