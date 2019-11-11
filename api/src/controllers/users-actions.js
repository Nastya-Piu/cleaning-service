import { JWT_SECRET_KEY, JWT_EXPIRES_IN } from 'json-server-auth/dist/constants'
import jwt from 'jsonwebtoken'
import { badRequest, success } from "../response"
import axios from 'axios'
const socialProfiles = ['googleId', 'facebookId', 'linkedinId'];

const getParams = (iteratedObj) => {
  let params = {};
  socialProfiles.forEach(key => {
    if (iteratedObj[key]) {
      params[key] = iteratedObj[key];
    }
  })
  return params;
}

export const login = (req, res, next) => {
  const user = req.body;
  const { db } = req.app;

  let params = getParams(user)

  if (Object.keys(params).length !== 0) {
    let userProfile = db.get('users').find(params).value();
    if (userProfile) {
      const token = jwt.sign({ email: userProfile.email }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN, subject: String(userProfile.id) });
      success(res, { accessToken: token })
    } else {
      badRequest(res)
    }

  } else {
    next();
  }
}

export const register = (req, res, next) => {

  const user = req.body;
  const { db } = req.app;

  let params = getParams(user)

  if (Object.keys(params).length !== 0) {

    let userProfile = db.get('users').find(params).value();

    if (userProfile) {
      badRequest(res)
    } else {

      const userWithEmail = db.get('users').find({ email: user.email }).value();

      if (userWithEmail) {
        badRequest(res)
      } else {
        db.get('users')
          .insert({ ...user })
          .write();

        const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN, subject: String(user.id) });
        success(res, { accessToken: token })
      }
    }

  } else {
    next();
  }

}

export const profile = (req, res, next) => {

  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET_KEY)
      const { db } = req.app;
      let user = db.get('users').find({ email: data.email }).value();
      user = (({ id, name, email, profilePicURL, address }) => ({ id, name, email, profilePicURL, address }))(user)
      success(res, [user])
    }
    catch (error) {
      badRequest(res)
    }

  } else {
    badRequest(res)
  }

}


export const linkedinLogin = (req, res, next) => {
  const code = req.body.code;
  const redirect = req.body.redirect;

  axios.post('https://www.linkedin.com/oauth/v2/accessToken?client_id=77ase93762zkx5&client_secret=seSlQPF4qbsXq71F&grant_type=authorization_code&redirect_uri=https://localhost:3001/users/' + redirect + '&code=' + code).then(response => {
    const { access_token } = response.data;
    if (access_token) {
      axios.get('https://api.linkedin.com/v2/me', { headers: { 'Authorization': `Bearer ${access_token}` } }).then(responseMe => {
        axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', { headers: { 'Authorization': `Bearer ${access_token}` } }).then(responseEmail => {
          const resultedUser = { ...responseMe.data, ...responseEmail.data }
          const user = {
            name: resultedUser.localizedFirstName + ' ' + resultedUser.localizedLastName,
            id: resultedUser.id,
            email: resultedUser.elements[0]['handle~'].emailAddress
          }
          success(res, { user });
        }).catch(errEmail => {
          badRequest(res)
        });

      }).catch(errMe => {
        badRequest(res)
      })
    } else {
      badRequest(res)
    }
  }).catch(err => {
    badRequest(res)
  });

}