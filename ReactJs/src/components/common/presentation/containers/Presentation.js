import React from 'react';
import { connect } from 'react-redux';

import SlidList from '../components/SlidList';
import EditMetaPres from '../components/EditMetaPres';
import CommandButton from '../components/CommandButton';
import AddSlidePanel from '../components/AddSlidePanel';
import DeleteSlidePanel from '../components/DeleteSlidePanel';
import Snackbar from 'material-ui/Snackbar';

import ScrollBar from 'react-perfect-scrollbar';

import {updatePresentation, savePres, setSelectedSlid} from '../../../../actions';

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
            slideTitle:this.props.slidTitle,
            slideDescription:this.props.slideDescription,
            open:false,
            openSnack:false,
            openDelete:false
        }
        this.handleChangeTitle=this.handleChangeTitle.bind(this);
        this.handleChangeDescription=this.handleChangeDescription.bind(this);
        
        this.handleSnackOpen=this.handleSnackOpen.bind(this);
        this.handleSnackClose=this.handleSnackClose.bind(this);
        
        this.handleAddSlide=this.handleAddSlide.bind(this);
        this.handleAddOpen=this.handleAddOpen.bind(this);
        this.handleAddClose=this.handleAddClose.bind(this);
        this.handleChangeTitleSlide=this.handleChangeTitleSlide.bind(this)
        this.handleChangeDescriptionSlide=this.handleChangeDescriptionSlide.bind(this);

        this.handleDelete=this.handleDelete.bind(this);
        this.handleDeleteOpen=this.handleDeleteOpen.bind(this);
        this.handleDeleteClose=this.handleDeleteClose.bind(this);
    }

    handleDelete(){
        this.handleDeleteClose();
        
        if(this.props.updated_slid.id === undefined){
            return;
        }

        const tmpPres = {
            id: this.props.presentation.id,
            title: this.props.presentation.title,
            description: this.props.presentation.description,
            slidArray: this.props.presentation.slidArray
        };
        tmpPres.slidArray.forEach(function(element,index) {
            if(element.id === this.props.updated_slid.id){
                tmpPres.slidArray.splice(index,1);
            }
        }, this);    

        this.props.dispatch(updatePresentation(tmpPres));
        this.props.dispatch(setSelectedSlid({}));
    };
    handleDeleteOpen(){
        this.setState({openDelete: true});
    };
    handleDeleteClose(){
        this.setState({openDelete: false});
    };


    handleSnackOpen(){
        this.props.dispatch(savePres());
        this.setState({openSnack: true});
    };
    handleSnackClose(){
        this.setState({openSnack: false});
    };


    handleAddSlide(){
        console.log(this.state.slideTitle);
        console.log(this.state.slideDescription);
        let tmpId = 100;
        const tmpPres = {
            id: this.props.presentation.id,
            title: this.props.presentation.title,
            description: this.props.description,
            slidArray: this.props.presentation.slidArray
        };
        const tmpSlid = {
            id:tmpId,
            title:this.state.slideTitle,
            txt:this.state.slideDescription,
            content:1
        };
        tmpPres.slidArray.push(tmpSlid);
        console.log(tmpPres.slidArray);
        this.props.dispatch(updatePresentation(tmpPres));
        this.handleAddClose();
    };
    handleAddOpen = () => {
        this.setState({open: true});
    };
    handleAddClose = () => {
        this.setState({open: false});
    };
    handleChangeTitleSlide = (ev) => {
        this.setState({slideTitle: ev.target.value});
    }
    handleChangeDescriptionSlide = (ev) => {
        this.setState({slideDescription: ev.target.value});
    }



    handleChangeTitle(newValue){
        const tmpPres = {
            id: this.props.presentation.id,
            title: newValue,
            description: this.props.presentation.description,
            slidArray: this.props.presentation.slidArray
        };
        this.props.dispatch(updatePresentation(tmpPres));
    }

    handleChangeDescription(newValue){
        const tmpPres = {
            id: this.props.presentation.id,
            title: this.props.presentation.title,
            description: newValue,
            slidArray: this.props.presentation.slidArray
        };
        this.props.dispatch(updatePresentation(tmpPres));
    }

    render() {

        return (
            <div>
                <div style={{height:"30vh"}}>
                    <CommandButton 
                        handleSnackOpen={this.handleSnackOpen}
                        handleAddOpen={this.handleAddOpen}
                        handleDeleteOpen={this.handleDeleteOpen}
                    />
                    <EditMetaPres
                        title={this.props.presentation.title}
                        description={this.props.presentation.description}
                        handleChangeTitle={this.handleChangeTitle}
                        handleChangeDescription={this.handleChangeDescription}
                    />
                </div>
                    <ScrollBar option={{wheelSpeed : 0.3}}>
                        <div style={{height:"55vh",padding:"2px"}}>
                            <SlidList
                                slidArray={this.props.presentation.slidArray}
                            />
                        </div>
                    </ScrollBar>
                <AddSlidePanel
                    handleAddSlide={this.handleAddSlide}
                    handleAddClose={this.handleAddClose}
                    handleChangeTitleSlide={this.handleChangeTitleSlide}
                    handleChangeDescriptionSlide={this.handleChangeDescriptionSlide}
                    open={this.state.open}
                />
                <DeleteSlidePanel
                    handleDelete={this.handleDelete}
                    handleDeleteClose={this.handleDeleteClose}
                    open={this.state.openDelete}
                />
                <Snackbar
                    open={this.state.openSnack}
                    message="Presentation saved on server"
                    autoHideDuration={2000}
                    onRequestClose={this.handleSnackClose}
                />
            </div>    
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        presentation : state.updateModelReducer.presentation,
        updated_slid : state.selectedReducer.slid,
        contentMap : state.updateModelReducer.content_map
    }
};

export default connect(mapStateToProps)(Presentation);