export const getAdventure = async (id) => {
    console.log(id)
    const res = await fetch("http://localhost:8080/api/adventure/"+id+".json")
    const json = res.json() 
    return json;
}