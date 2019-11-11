import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_OUT_GOOGLE,
  USER_EXISTS,
  FETCH_USER,
  UPDATE_USER,
  SIGN_IN_ERROR
} from './types';
import history from '../../history';
import api from '../../api';

export const signOutGoogle = () => {
  return {
    type: SIGN_OUT_GOOGLE
  }
};

export const signIn = (user) => {

  let params = {};

  return async dispatch => {

    api.post('/login', user)
      .then(async response => {
        localStorage.setItem('accessToken', response.data.accessToken);

        let userResponse = await api.get('/profile');
        dispatch({
          type: SIGN_IN,
          payload: { user: userResponse.data[0], params }
        });
        history.push('/');
      })
      .catch(err => {
        dispatch({
          type: SIGN_IN_ERROR
        });
      });

  };

};

export const signOut = () => {

  return (dispatch) => {
    dispatch({
      type: SIGN_OUT
    })
  }
};

export const register = (credentials) => {

  return async dispatch => {

    if (!('profilePicURL' in credentials)) {
      credentials['profilePicURL'] = "https://picsum.photos/200";
    }
    delete credentials['id']; // If set by social engine
    delete credentials['repeatPassword'];
    await api.post('/users', credentials).then(async response => {
      localStorage.setItem('accessToken', response.data.accessToken);
      let userResponse = await api.get('/profile')
      dispatch({
        type: SIGN_IN,
        payload: { user: userResponse.data[0] }
      });
      history.push('/');
    })
      .catch(error => {
        if (error) {
          dispatch({
            type: USER_EXISTS
          })
        }
      });
  }

};


export const getUserById = (id) => {

  return async dispatch => {
    const userInfo = await api.get(`/users?id=${id}&limit=1`);

    dispatch({
      type: FETCH_USER,
      payload: userInfo.data[0]
    });

  };
};

export const updateProfile = (newValues) => {

  return async dispatch => {
    const response = await api.patch(`/users/${newValues.id}`, newValues);
    dispatch({
      type: UPDATE_USER,
      payload: response.data
    });
    history.push(`/users/${response.data.id}`);
  }
}

export const getProfile = () => {

  return async dispatch => {
    const response = await api.get(`/profile`);
    if (response.data.length) {
      dispatch({
        type: SIGN_IN,
        payload: { user: response.data[0] }
      });
    }
  }
}
