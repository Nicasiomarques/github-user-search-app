export const highLevelMessage = message => err => {
  console.error(err);
  return Promise.reject(message);
};

export const fetchAdapter = async ({ method, headers, body, url, signal }) => {
  const response = await fetch(url, {
    signal,
    method,
    ...(method !== 'GET' && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    }
  }).catch(error => error)

  return {
    statusCode: response.status,
    body: await response.json(),
    ...(response instanceof Error && { error: response }),
  }
}
