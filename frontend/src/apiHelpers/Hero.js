export const getHeroTraits = async (id) => {
    const res = await fetch("process.env.API_URL"+"/Hero/GetHeroMetadata/"+id)
    const json = await res.json() 
    return json;
}