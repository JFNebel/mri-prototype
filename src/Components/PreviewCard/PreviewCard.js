import './PreviewCard.css';
import React, { useState } from 'react';

import { Delete } from '@mui/icons-material';

function PreviewCard(props) {

  const refSelect = React.useRef();


  React.useEffect(() => {
    console.log('PreviewCard: useEffect');
    console.log(props.files);
  } , [props.files]);

  const getDefaultValue = (idx) => {
    let value = '';
    if (idx == 0) {
      value = 't1';
    }
    value = props.files[0].mriType == 't1' ? 't2' : 't1';
    props.files[idx].mriType = value;
    return value;
  }

  return (
    <div className="img-preview">
      <div>
        {props.files.map((file, idx) => (
          <div key={file.name} className="item-drop">
            <div>
              {file.name.length > 15
                ? file.name.substring(0, 15) + '...'
                : file.name}{' '}
              ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
            <div>
              <select
                id={`mriSelect-${idx}`}
                onChange={e => {
                  const selectBox = document.getElementById(`mriSelect-${idx}`);
                  const selectedValue = selectBox.options[selectBox.selectedIndex].value;
                  props.setFiles(fs => {
                    fs[idx].mriType = selectedValue;
                    return fs;
                  });
                }}
              >
                <option value='' defaultValue></option>
                <option value='t1'>T1</option>
                <option value='t2'>T2</option>
              </select>
            </div>
            <div
              onClick={() => {
                console.log(props.files);
                props.setFiles(files =>
                  files.filter(f => f.name !== file.name)
                );
                console.log(props.files);
              }}
            >
              <Delete
                style={{ color: '#707070' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviewCard;
