export const setSelectedSlid=(slid_obj)=>{
    return {
        type: 'UPDATE_SELECTED_SLID',
        obj : slid_obj
    };
};

export const updateContentMap = (contentMap_obj) => {
    return {
        type: 'UPDATE_CONTENT_MAP',
        obj : contentMap_obj
    };
};