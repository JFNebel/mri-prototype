const URL_SERVER = 'http://127.0.0.1:8000'


export async function sendFile({ file }) {
  const url = new URL(URL_SERVER);
  url.pathname = '/predict';

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'access-control-expose-headers': '*',
      }
    });
    const filename = response.headers.get('filename');
    const blob = await response.blob();

    return {
      filename,
      blob,
    }
  } catch (error) {
    console.log(error);
  }
}
