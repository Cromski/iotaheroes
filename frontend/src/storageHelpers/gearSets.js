import remove from 'lodash/remove'

export const getAllSets = () => {
    var setsString = localStorage.getItem("sets");
    return JSON.parse(setsString);
}
export const getSet = (name) => {
    var setsString = localStorage.getItem("sets");
    var gearSets = JSON.parse(setsString);
    return gearSets.find(e => e.name === name);

}

export const saveSet = (name, equipArr) => {
    if (name !== undefined || name !== "")
    {
        var setsString = localStorage.getItem("sets");
        var gearSets = JSON.parse(setsString);
        var simpleEquipArr = equipArr.map(a => a.id);
        if(gearSets === null) // instantiate if not found
        {
            gearSets = [];
        }    
        var gearSet = gearSets.find(e => e.name === name);
        if (gearSet === undefined)
        {
            // if gearSet didnt exist add it
            gearSets.push({name:name, gear:simpleEquipArr})
        } else {
            // if it did exist just update the gear
            gearSet.gear = simpleEquipArr
        }
        localStorage.setItem("sets", JSON.stringify(gearSets));
    }
}

export const removeSet = (name) => {
    var setsString = localStorage.getItem("sets");
    var gearSets = JSON.parse(setsString);
    remove(gearSets, (e => e.name === name));
    localStorage.setItem("sets", JSON.stringify(gearSets));
}