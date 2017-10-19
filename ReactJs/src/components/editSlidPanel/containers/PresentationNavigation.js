import React, { Component } from 'react';
import { connect } from 'react-redux';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import FastForward from 'material-ui/svg-icons/av/fast-forward';
import FastRewind from 'material-ui/svg-icons/av/fast-rewind';
import SkipNext from 'material-ui/svg-icons/av/skip-next';
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous';

const play = <Play />;
const pause = <Pause />
const fastForward = <FastForward />
const fastRewind = <FastRewind />
const skipNext = <SkipNext />
const skipPrevious = <SkipPrevious />

class PresentationNavigation extends Component{
    //class constructor whith given properties
    constructor(props) {
        super(props);
        this.state = {};
    }

    //render function use to update the virtual dom
    render() {
        return (
            <Paper zDepth={1} style={{marginBottom:10}}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Begin"
                        icon={skipPrevious}
                        onClick={() => this.props.handleNav('BEGIN')}
                    />
                    <BottomNavigationItem
                        label="Previous"
                        icon={fastRewind}
                        onClick={() => this.props.handleNav('PREV')}
                    />
                    <BottomNavigationItem
                        label="Play"
                        icon={play}
                        onClick={() => this.props.handleNav('START')}
                    />
                    <BottomNavigationItem
                        label="Pause"
                        icon={pause}
                        onClick={() => this.props.handleNav('PAUSE')}
                    />
                    <BottomNavigationItem
                        label="Next"
                        icon={fastForward}
                        onClick={() => this.props.handleNav('NEXT')}
                    />
                    <BottomNavigationItem
                        label="End"
                        icon={skipNext}
                        onClick={() => this.props.handleNav('END')}
                    />
                </BottomNavigation>
          </Paper>
        );
    }
}

export default connect()(PresentationNavigation);

