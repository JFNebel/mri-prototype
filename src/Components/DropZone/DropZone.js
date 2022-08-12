import './DropZone.css';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';
import PreviewCard from '../PreviewCard/PreviewCard';
import ResultsCard from '../ResultsCard/ResultsCard';
import { Button, Container } from '@mui/material';

import { sendFile } from '../../Services'

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
  const [segment, setSegment] = useState();
  const [downloadFile, setDownloadFile] = useState(true);
  const [previewView, setPreviewView] = useState();

  React.useEffect(() => {
    setSegment(files.length == 2);
    setPreviewView(!!files.length);
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

  const sendFiles = () => {
    const mriT1 = files.find(f => f.mriType == 't1');
    const mriT2 = files.find(f => f.mriType == 't2');
    sendFile({ mriT1, mriT2 })
      .then(res => {
        setDownloadFile(res);
      })
      .catch(err => {
        console.log(err);
      });
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
      {previewView && <PreviewCard setFiles={setFiles} files={files} />}
      {segment && (
        <div className="segment-button">
          <Button
            variant="outlined"
            onClick={() => {
              console.log(files);
            }}
          >
            Segmentar
          </Button>
        </div>
      )}
      {downloadFile && <ResultsCard downloadFile={downloadFile} />}
    </Container>
  );
}

export default DropZone;
