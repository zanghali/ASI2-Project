const commandReducer = (state={cmdPres:{}},action) => {
    switch(action.type){
        case 'SAVE_CMD':
            const newState1={
                cmdPres : action.obj
            };
            return newState1;
        default:
            return state;    
    }
}

export default commandReducer;