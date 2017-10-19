import React from 'react';

import TextField from 'material-ui/TextField';

export default class EditMetaPres extends React.Component{

    render(){

        // return(
        //     <div className="card bg-light mb-3">
        //         <div className="card-body">
        //             <div className="form-group">
        //                 <label htmlFor="currentPresTitle">Title</label>
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     id="currentPresTitle"
        //                     onChange={this.props.handleChangeTitle}
        //                     value={this.props.title}
        //                 />
        //                 <label htmlFor="currentPresDescription">Text</label>
        //                 <textarea
        //                     rows="5"
        //                     type="text"
        //                     className="form-control"
        //                     id="currentPresDescription"
        //                     onChange={this.props.handleChangeDescription}
        //                     value={this.props.description}>
        //                 </textarea>
        //             </div>
        //         </div>    
        //     </div>
        // );
        return(
            <div className="mb-3">
                <TextField
                    hintText="Title"
                    floatingLabelText="Presentation Title"
                    fullWidth={true}
                    value={this.props.title}
                    onChange={(event, newValue) => this.props.handleChangeTitle(newValue)}
                />
                <TextField
                    hintText="Description"
                    floatingLabelText="Description"
                    fullWidth={true}
                    multiLine={true}
                    value={this.props.description}
                    onChange={(event, newValue) => this.props.handleChangeDescription(newValue)}
                />
            </div>
        );

    }
}