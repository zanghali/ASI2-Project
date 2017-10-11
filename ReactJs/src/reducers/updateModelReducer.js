// var Tools = require('../services/Tools.js');

const updateModelReducer = (state={presentation:{},content_map:{}},action) => {

    switch(action.type){
        case 'UPDATE_PRESENTATION':
            return;
        case 'UPDATE_PRESENTATION_SLIDS':
            return;
        case 'UPDATE_CONTENT_MAP':
            const newState3={
                content_map : action.obj
            }; 
            return newState3;
        case 'ADD_CONTENT':
            return;
        default:
            return state;        
    }
}

export default updateModelReducer;
