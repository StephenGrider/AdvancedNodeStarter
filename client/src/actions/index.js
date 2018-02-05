import axios from 'axios';
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, files, history) => async dispatch => {
  let fileKeys = [];

  for (let id in files) {
    const file = files[id];
    const uploadConfig = await axios.get(`/api/upload?type=${file.type}`);

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    fileKeys.push(uploadConfig.data.key);
  }

  const res = await axios.post('/api/blogs', {
    ...values,
    files: fileKeys
  });

  history.push('/blogs');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs');

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
