const BASE_URL = 'https://dummyapi.io/data/v1';

function fetchUsers(url = '', options = {}) {
  return fetch(url, options).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Something went wrong...'));
  });
}

export function getAllUsers() {
  const optionsGet = {
    headers: {
      'app-id': '6154537832884b1a024b2f3c',
      'Content-Type': 'application/json',
    },
  };
  return fetchUsers(`${BASE_URL}/user`, optionsGet);
}

export function postUser(newUser) {
  const optionsPost = {
    method: 'POST',
    headers: {
      'app-id': '6154537832884b1a024b2f3c',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  };
  return fetchUsers(`${BASE_URL}/user/create`, optionsPost);
}
