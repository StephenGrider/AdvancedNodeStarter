//import axios from 'axios';
import {fetchUsers, postToken} from '../api/fetchUsers'; 

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
  const res = await axios.post('/api/blogs', values);

  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs');

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
