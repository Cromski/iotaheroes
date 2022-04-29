export const getTopHoldersForItemId = async (itemId) => {
    const res = await fetch("process.env.API_URL"+"/Token/GetTopHolder?itemId="+itemId)
    const json = await res.json() 
    return json;
}