let Tools={}

// Tools.generateUUID= function(){
//        var d = new Date().getTime();
//        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)      {
//             var r = (d + Math.random()*16)%16 | 0;
//             d = Math.floor(d/16);
//                 return (c=='x' ? r : (r&0x3|0x8)).toString(16);
//         });
//         return uuid;
//     };
// Tools.generateUUID= function(){
//     return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
//         (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//       )
//  };

//Fonction fournie trop lente? plante parfois a l'exe
Tools.generateUUID = function(){
    return (Math.random()*10000)%10000 //Peu de chance d'avoir plus de 10000 content sur le serveur...
}


Tools.getNextSlidIndex= function(array,slidId){
    let index=-1;
    for(var i=0;i<array.length;i++){
        if(slidId===array[i].id){
            index=i;
            break;
        }
    }
    if(index+1<array.length){
        return index+1;
    }
    return array.length-1;
}

Tools.getPrevSlidIndex=function(array,slidId){
    let index=-1;
    for(var i=0;i<array.length;i++){
        if(slidId===array[i].id){
            index=i;
            break;
        }
    }
    if(index-1>=0){
        return index-1;
    }
    return 0;
}


module.exports = Tools;