const API_URL = 'https://spotify-project-backend.herokuapp.com';
const API = {
  request: async ({
    path, body, header, queries = {}, method = 'GET',
  }) => {
    let endpoint = `${API_URL}/${path}?a=1`;

    Object.keys(queries).forEach((key) => {
      const value = queries[key];
      endpoint += `&${key}=${value}`;
    });

    const payload = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...header,
      },
    };
    if (method !== 'GET') payload.body = JSON.stringify(body);

    console.log(payload)

    const response = await fetch(endpoint, payload);
    console.log("returning response from fetch", response)
    return response;
  },

};

export const createDiscoverDaily = async (accessToken, setShowButton, setGenerated) => {
  setShowButton(false)

  console.log("about to request data")
  await API.request({method: 'POST', body: { accessToken }, path: 'createDiscoverDaily' })
  setGenerated(true)
}