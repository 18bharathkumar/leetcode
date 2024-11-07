import URL from "../url";

let data;
const token = localStorage.getItem('token')
const fetchprofile = async()=>{
    if(data)
        return data;
    if(token){
        try{
        const response = await fetch(`${URL}/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include token in headers
            },
          });
          if(response.ok){
            data = await response.json();
            return data;
          }
        }
        catch(err){
            console.log(err);
            throw err;   
        }
        }
        else{
            return null;
        }
        
    }

export default fetchprofile;
