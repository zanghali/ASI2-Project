import React from 'react';

import Slid from '../../slid/containers/Slid';


export default class SlidList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            slidArray:this.props.slidArray,
            contentMap:this.props.contentMap,
        }
        this.getAllSlideRender=this.getAllSlideRender.bind(this);
    }

    getAllSlideRender(){
        let array_render=[];
        
            if (this.props.slidArray === undefined)
                return ;
            
            let slidListLength = Object.keys(this.props.slidArray).length;    
            for(var i=0;i<slidListLength;i++){
                let obj = this.props.slidArray[i];
                array_render.push(
                    <Slid
                        key={obj.id}
                        id={obj.id}
                        title={obj.title}
                        txt={obj.txt}
                        content={obj.content_id}
                        contentMap={this.props.contentMap}
                        displayMode="SHORT"
                    />
                );
            }
    
            return array_render;
    }

    render() {

        const display_list= this.getAllSlideRender();

        return display_list;
    }
}