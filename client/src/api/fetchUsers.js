import axios from 'axios';

export const fetchUsers = async () =>{

    return await axios.get('/api/current_user');

};


export const postToken = async (token) => {
    const res = await axios.post('/api/stripe', token); 
    return res; 
}; 


export const postBlog = async(values) =>{

    return await axios.post('/api/blogs', values); 
}; 


export const getBlog = async (id) => {

    return await axios.get(`/api/blog/${id}`); 

}



export const getBlogs = async (id) => {

    return await axios.get(`/api/blogs`); 

}



