import './DropZone.css';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';
import PreviewCard from '../PreviewCard';
import ResultsCard from '../ResultsCard';
import { Container } from '@mui/material';
import { useSnackbar } from 'notistack';

import { sendFile } from '../../services';
import { LoadingButton } from '@mui/lab';

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
  const [typeFiles, setTypeFiles] = useState(['nada', 'nada']);
  const [downloadFile, setDownloadFile] = useState();
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (files.length < 2) {
      setDownloadFile();
    }
  }, [files]);

  React.useEffect(() => {
    if (downloadFile) {
      window.papaya.Container.startPapaya();
      /* console.log('Papaya started', downloadFile);
      const link = document.createElement('a');
      link.href = downloadFile.href;
      link.download = downloadFile.filename;
      link.click();
      setTimeout(() => {
        console.log('Opening papaya');
        window.papaya.Container.addImage(0, '/Users/jolyne/Documents/test.nii.gz');
      }, 5000); */
    }
  }, [downloadFile]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log('Accepted files', acceptedFiles);
    let newFiles = [...files, acceptedFiles].flat();
    newFiles = newFiles.map((file) => {
      if (file.name.toLowerCase().includes('t1')) {
        file.mriType = 't1';
      } else if (file.name.toLowerCase().includes('t2')) {
        file.mriType = 't2';
      }
      return file;
    });
    setFiles(newFiles);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    [isFocused, isDragAccept, isDragReject]
  );

  const sendFiles = () => {
    setLoading(true);
    const mriT1 = files.find((f) => f.mriType === 't1');
    const mriT2 = files.find((f) => f.mriType === 't2');

    if (!mriT1) {
      enqueueSnackbar('Debe seleccionar una MRI T1', { variant: 'error' });
    }
    if (!mriT2) {
      enqueueSnackbar('Debe seleccionar una MRI T2', { variant: 'error' });
    }
    if (mriT1 && mriT2) {
      return sendFile({ mriT1, mriT2 })
        .then((res) => {
          setLoading(false);
          res.href = window.URL.createObjectURL(res.blob);
          setDownloadFile(res);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    }
    setLoading(false);
  };

  return (
    <Container className="main-dropzone">
      <div className="dropzone-outer" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="dropzone">
          {isDragActive ? (
            <p>Arrastra un archivo T1 y T2 aquí (.nii, .nii.zip o .nii.gz)</p>
          ) : (
            <p>
              Arrastra archivos T1 y T2 (.nii, .nii.zip o .nii.gz)
              <br />
              <br />o<br />
              <br />
              Haz click aquí para buscarlos entre tus carpetas.
            </p>
          )}
        </div>
      </div>
      {files.length > 0 && (
        <PreviewCard
          setFiles={setFiles}
          files={files}
          setTypeFiles={setTypeFiles}
          typeFiles={typeFiles}
        />
      )}
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
      {downloadFile && (
        <>
          <ResultsCard
            downloadFile={downloadFile}
            setFiles={setFiles}
            setDownloadFile={setDownloadFile}
          />
          <div
            className="papaya"
          />
        </>
      )}
    </Container>
  );
}

export default DropZone;
