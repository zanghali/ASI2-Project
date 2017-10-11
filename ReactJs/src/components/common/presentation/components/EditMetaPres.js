import React from 'react';

export default class EditMetaPres extends React.Component{

    render(){

        return(
            <div className="card bg-light mb-3">
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="currentPresTitle">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="currentPresTitle"
                            onChange={this.props.handleChangeTitle}
                            value={this.props.title}
                        />
                        <label htmlFor="currentPresDescription">Text</label>
                        <textarea
                            rows="5"
                            type="text"
                            className="form-control"
                            id="currentPresDescription"
                            onChange={this.props.handleChangeDescription}
                            value={this.props.description}>
                        </textarea>
                    </div>
                </div>    
            </div>
        );

    }
}