export const highLevelMessage = message => err => {
  console.error(err);
  return Promise.reject(message);
};

export const fetchAdapter = ({ method, headers, body, url, signal }) => {
  return fetch(url, {
    signal,
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    }
  }).then(res => res.ok ? res.json() : Promise.reject(res))
}
