const URL_SERVER = 'https://a9f5-2001-1458-204-1-00-102-7780.eu.ngrok.io';


export async function sendFile({ file }) {
  console.log('URL_SERVER', URL_SERVER);
  const url = new URL(URL_SERVER);
  url.pathname = '/api/v1/segmenter/predict';

  const formData = new FormData();
  formData.append('image', file);

  console.log('Sending file to', url);

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
