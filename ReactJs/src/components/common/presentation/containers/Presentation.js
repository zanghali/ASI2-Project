import React from 'react';
import { connect } from 'react-redux';

import SlidList from '../components/SlidList';
import EditMetaPres from '../components/EditMetaPres';

import './presentation.css';

class Presentation extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,                   //Presentation ID
            title:this.props.title,             //Slide title
            description:this.props.description, //Presentation description
            slidArray:this.props.slidArray,
            contentMap:this.props.contentMap,
        }
        this.handleChangeTitle=this.handleChangeTitle.bind(this);
        this.handleChangeDescription=this.handleChangeDescription.bind(this);
    }

    handleChangeTitle(e){
        this.setState({title:e.target.value});
    }

    handleChangeDescription(e){
        this.setState({description:e.target.value});
    }

    render() {

        return (
            <div>
                <EditMetaPres
                    title={this.props.presentation.title}
                    description={this.props.presentation.description}
                    handleChangeTitle={this.handleChangeTitle}
                    handleChangeDescription={this.handleChangeDescription}
                />
                <SlidList
                    slidArray={this.props.presentation.slidArray}
                />
            </div>    
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        presentation : state.updateModelReducer.presentation
    }
};

export default connect(mapStateToProps)(Presentation);