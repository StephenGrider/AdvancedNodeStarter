//import axios from 'axios';
import {
  fetchUsers, postToken, 
  postBlog, getBlogs, getBlog, 
} from '../api/fetchUsers'; 

import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from './types';

export const fetchUser = () => async dispatch => {
  const { data } = fetchUsers(); 

  dispatch({ type: FETCH_USER, payload: data });
};

export const handleToken = token => async dispatch => {
  const {data} = await postToken(token);

  dispatch({ type: FETCH_USER, payload: data });
};

export const submitBlog = (values, history) => async dispatch => {
  const {data} = await postBlog(values);

  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: data });
};

export const fetchBlogs = () => async dispatch => {
  const {data} = await getBlogs();

  dispatch({ type: FETCH_BLOGS, payload: data });
};

export const fetchBlog = id => async dispatch => {
  //const res = await axios.get(`/api/blogs/${id}`);
  const {data} = await getBlog(id); 

  dispatch({ type: FETCH_BLOG, payload: data });
};
