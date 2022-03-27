export const hashMapBuilder = (objects, property) => {
    let hashMap = {};
    for(const element of objects){
        if(!hashMap[element[property]]){
            hashMap[element[property]] = 1
        }
        else{
            hashMap[element[property]]++;
        }
    }
    return hashMap;
}