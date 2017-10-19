import React from 'react';

import './main.css';
// import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import '../../lib/bootstrap-4.0.0-beta/dist/css/bootstrap.min.css';

import * as contentMapTmp from '../../source/contentMap.json';
import * as slideMapTmp from '../../source/pres.json';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import BrowseContentPanel from '../browseContentPanel/containers/browseContentPanel.js';
import BrowsePresentationPanel from '../browsePresentationPanel/containers/BrowsePresentationPanel';
import Presentation from '../common/presentation/containers/Presentation';

//Provider
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import globalReducer from '../../reducers';
import { updateContentMap, updatePresentation} from '../../actions';

var Comm = require('../../services/Comm.js');
const store = createStore(globalReducer);

export default class Main extends React.Component{

    constructor(props) {
        super(props);
        this.comm = new Comm();
        this.state = {
            slideMap: slideMapTmp,
            contentMap: contentMapTmp
        }
        store.dispatch(updatePresentation(slideMapTmp));
        store.dispatch(updateContentMap(contentMapTmp));
        
        store.subscribe(() => {
            this.setState({
                contentMap : store.getState().updateModelReducer.content_map
            });
        });

        //Binding
        this.loadContentUpdate = this.loadContentUpdate.bind(this);
        this.loadPresUpdate = this.loadPresUpdate.bind(this);
        this.callbackErr = this.callbackErr.bind(this);

        //Try to load for the first time
        this.comm.loadContent(this.loadContentUpdate,this.callbackErr);
        this.comm.loadPres(0,this.loadPresUpdate,this.callbackErr);

    }

    loadContentUpdate(data){
        store.dispatch(updateContentMap(data));
    }

    loadPresUpdate(data){
        store.dispatch(updatePresentation(data));
    }

    callbackErr(msg){
        console.error(msg);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Paper zDepth={3} style={{marginBottom:"3vh"}}>    
                        <AppBar
                            title="Presentation"
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                        />
                    </Paper>
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-md-3 col-lg-3' style={{overflowX:"hidden",overflowY:"auto",maxHeight:"87vh"}}>
                                <Presentation />
                            </div>
                            <div className='col-md-6 col-lg-6' style={{overflowX:"hidden",overflowY:"auto",maxHeight:"87vh"}}>
                                <BrowsePresentationPanel />
                            </div>
                            <div className='col-md-3 col-lg-3' style={{overflowX:"hidden",overflowY:"auto",maxHeight:"87vh"}}>
                                <BrowseContentPanel />
                            </div>
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}