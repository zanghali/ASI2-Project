import React from 'react';

import './main.css';
// import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import '../../lib/bootstrap-4.0.0-beta/dist/css/bootstrap.min.css';

import * as contentMapTmp from '../../source/contentMap.json';
import * as slideMapTmp from '../../source/pres.json';

import BrowseContentPanel from '../browseContentPanel/containers/browseContentPanel.js';
import BrowsePresentationPanel from '../browsePresentationPanel/containers/BrowsePresentationPanel';
import Presentation from '../common/presentation/containers/Presentation';

//Provider
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import globalReducer from '../../reducers';
import { updateContentMap, updatePresentation} from '../../actions';
const store = createStore(globalReducer);

export default class Main extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            slideMap: slideMapTmp,
            contentMap: contentMapTmp
        }
        store.dispatch(updatePresentation(slideMapTmp));
        store.dispatch(updateContentMap(contentMapTmp));
    }

    render() {
        return (
            <Provider store={store}>
                <div className='container-fluid height-100'>
                    <div className="row height-100">
                        <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                            <Presentation
                                //id={this.state.slideMap.id}
                                //title={this.state.slideMap.title}
                                //description={this.state.slideMap.description}
                                //slidArray={this.state.slideMap.slidArray}
                                //contentMap={this.state.contentMap}
                            />
                        </div>
                        <div className='col-md-6 col-lg-6 height-100'>
                            <BrowsePresentationPanel
                                //contentMap={this.state.contentMap}
                            />
                        </div>
                        <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                            <BrowseContentPanel 
                                //contentlists={this.state.contentMap}
                            />
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}