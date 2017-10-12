import React from 'react';

import Visual from '../components/Visual';

export default class Content extends React.Component{

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

        return (
            <Visual
                id={this.props.id}
                src={this.props.src}
                type={this.props.type}
                title={this.props.title}
                onlyContent={this.props.onlyContent}
            />
        );
    }
}