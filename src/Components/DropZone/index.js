import './DropZone.css';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';
import PreviewCard from '../PreviewCard';
import ResultsCard from '../ResultsCard';
import { Container } from '@mui/material';
import { useSnackbar } from 'notistack';

import { sendFile } from '../../services';
import { LoadingButton } from '@mui/lab';

import ndarray from 'ndarray';
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
  const [dataImage, setDataImage] = useState();

  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (files.length < 2) {
      setDownloadFile();
    }
  }, [files]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
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

  const nArrayParse = (input, shape) => {
    const inputArray = ndarray(input.flat(5), shape);
    console.log('inputArray', inputArray);
    console.log('get item', inputArray.get(128,22,128));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = shape[0];
    canvas.height = shape[1];

    // create imageData object
    const idata = ctx.createImageData(shape[0], shape[1]);

    // set our buffer as source
    idata.data.set(inputArray.hi(2, 2).data);

    // update canvas with new data
    ctx.putImageData(idata, 0, 0);

    const dataUri = canvas.toDataURL();
    setDataImage(dataUri);
  }

  const blob2Zip = async (blob) => {
    const zip = new JSZip();
    const fileZip = await zip.loadAsync(blob);
    console.log('fileZip', fileZip);
    console.log('fileZip.files', fileZip.files);

    const fileKeys = Object.keys(fileZip.files);
    const fileKey = fileKeys.find((name) => name.includes('numpy'));
    const fileJSON = fileZip.files[fileKey];
    console.log('fileJSON', fileJSON);

    const fileJSONString = await fileJSON.async('string');
    const fileJSONParsed = JSON.parse(fileJSONString);
    console.log('fileJSONParsed', fileJSONParsed);

    const { input, label } = fileJSONParsed;
    const shape = [256, 44, 256];

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = shape[0];
    canvas.height = shape[1];

    // create imageData object
    const idata = ctx.createImageData(shape[0], shape[1]);

    // set our buffer as source
    const imageArray = input[0];
    console.log('imageArray', imageArray);
    idata.data.set(imageArray);

    // update canvas with new data
    ctx.putImageData(idata, 0, 0);

    const dataUri = canvas.toDataURL();
    setDataImage(dataUri);

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
      {dataImage && <img src={dataImage} alt="MRI" />}
    </Container>
  );
}

export default DropZone;
