const commandReducer = (state={cmdPres:{}},action) => {
    switch(action.type){
        case 'SAVE_CMD':
            const newState1={
                cmdPres : action.obj
            };
            return newState1;
        case 'COMMAND_PRESENTATION':
            const newState2 = {
                cmdPres : action.obj
            }
            return newState2;
        default:
            return state;    
    }
}

export default commandReducer;