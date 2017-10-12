const selectedReducer = (state={slid:{}},action) => {
    switch(action.type){
        case 'UPDATE_SELECTED_SLID':
            const newState1={
                slid : action.obj
            };
            return newState1;
        case 'UPDATE_SLID':
            const newState2 = {
                slid : action.obj
            }
            return newState2;
        default:
            return state;    
    }
}

export default selectedReducer;