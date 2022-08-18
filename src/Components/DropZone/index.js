import './DropZone.css';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';
import PreviewCard from '../PreviewCard';
import ResultsCard from '../ResultsCard';
import { Container } from '@mui/material';
import { useSnackbar } from 'notistack';

import { sendFile } from '../../services';
import { LoadingButton } from '@mui/lab';

import JSZip from 'jszip';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 10,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function DropZone() {
  const [files, setFiles] = useState([]);
  const [downloadFile, setDownloadFile] = useState();
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (files.length < 2) {
      setDownloadFile();
    }
  }, [files]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((files) => [...files, acceptedFiles].flat());
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles: 2,
    disabled: files.length >= 2,
  });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [ isFocused, isDragAccept, isDragReject ]
  );

  const blob2Zip = async (blob) => {
    const zip = new JSZip();
    const fileZip = await zip.loadAsync(blob);
    console.log('fileZip', fileZip);
    console.log('fileZip.files', fileZip.files);
    const fileKeys = Object.keys(fileZip.files);
    const fileKey = fileKeys.find((name) => name.includes('numpy'));
    const fileJSON = fileZip.files[fileKey];
    console.log('fileJSON', fileJSON);
    // parse fileJSON to JSON
    const fileJSONString = await fileJSON.async('string');
    const fileJSONParsed = JSON.parse(fileJSONString);
    console.log('fileJSONParsed', fileJSONParsed);
    return fileJSONParsed;
  }

  const sendFiles = () => {
    setLoading(true);
    const mriT1 = files.find(f => f.mriType === 't1');
    const mriT2 = files.find(f => f.mriType === 't2');

    if (!mriT1) {
      enqueueSnackbar('Debe seleccionar una MRI T1', { variant: 'error' })
    }
    if (!mriT2) {
      enqueueSnackbar('Debe seleccionar una MRI T2', { variant: 'error' })
    }
    if (mriT1 && mriT2) {
      return sendFile({ mriT1, mriT2 })
        .then(res => {
          setLoading(false);
          setDownloadFile(res);
          blob2Zip(res.blob).then(result => {
            console.log('result', result);
          }).catch(err => {
            console.log('err', err);
          });
        })
        .catch(err => {
          setLoading(false);
          console.error(err);
        });
    }
    setLoading(false);
  }

  return (
    <Container className="main-dropzone">
      <div className="dropzone-outer" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="dropzone">
          {isDragActive ? (
            <p>Arrastra un archivo T1 y T2 aquí</p>
          ) : (
            <p>
              Arrastra archivos T1 y T2
              <br />
              <br />o<br />
              <br />
              Haz click aquí para buscarlos entre tus carpetas.
            </p>
          )}
        </div>
      </div>
      {files.length > 0 && <PreviewCard setFiles={setFiles} files={files} />}
      {files.length === 2 && !downloadFile && (
        <div className="segment-button">
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={() => sendFiles()}
          >
            Segmentar
          </LoadingButton>
        </div>
      )}
      {downloadFile && <ResultsCard downloadFile={downloadFile} setFiles={setFiles} setDownloadFile={setDownloadFile} />}
    </Container>
  );
}

export default DropZone;
