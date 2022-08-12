import './DropZone.css';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';
import PreviewCard from '../PreviewCard/PreviewCard';
import ResultsCard from '../ResultsCard/ResultsCard';
import { Button, Container } from '@mui/material';

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
  const [previewView, setPreviewView] = useState();
  const [segment, setSegment] = useState();
  const [resultsView, setResultsView] = useState();

  React.useEffect(() => {
    setSegment(files.length == 2);
    setPreviewView(!!files.length);
  }, [files]);

  // Do que ocurre cuando dropeo algo en el DropZone.
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((files) => [...files, acceptedFiles].flat()); // Actualizo arreglo de files
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
    // multiple: false,
  });

  // Dummy view switcher
  const lowerCardSwitcher = () => {
    setPreviewView(false);
    setResultsView(true);
  };

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

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
      {resultsView && <ResultsCard />}
    </Container>
  );
}

export default DropZone;
