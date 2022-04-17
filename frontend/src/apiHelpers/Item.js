export const getAllItems = async () => {
    const res = await fetch("process.env.API_URL"+"/Item")
    const json = res.json() 
    return json;
}

export const getItem = async (id) => {
    const resp = await fetch("process.env.API_URL"+"/Item/"+id)
    const json = await resp.json();
    return json;
  }