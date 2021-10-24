import axios from 'axios';

export const fetchUsers = async () =>{

    return await axios.get('/api/current_user');

};


export const postToken = async (token) => {
    const res = await axios.post('/api/stripe', token); 
    return res; 
}; 



