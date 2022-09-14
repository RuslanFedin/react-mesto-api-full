export const BASE_URL = 'https://mestobknd.nomoredomains.sbs';

export const register = (email, password) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    if (res.status === 201) {
      return res.json();
    }
  })
  .then((res) => {
    return res;
  })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    }
  })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    }
  })
};
