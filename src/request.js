import queryString from 'query-string';

export const request = async (url, method, params) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}${url}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(method === 'POST' ? params : {}),
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getRequest = async (url, params) =>
  request(`${url}?${queryString.stringify(params)}`, 'GET', params);

export const postRequest = async (url, params) =>
  request(url, 'POST', { body: JSON.stringify(params) });
