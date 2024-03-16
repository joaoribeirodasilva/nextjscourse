const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null



// Fetch single property
const fetchProperty = async(id) => {

    try {
      
        if (!apiDomain) {
            return null;
        }
      const res = await fetch(`${apiDomain}/properties/${id}`);
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return res.json();
  
    } catch(error) {
      console.log(error)
      return null;
    }
}

export default fetchProperty;