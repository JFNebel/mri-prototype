import './PreviewCard.css';
import React from 'react';

import { Delete } from '@mui/icons-material';

function PreviewCard(props) {

  return (
    <div className="img-preview">
      <div>
        {props.files.map((file, idx) => (
          <div key={file.name} className="item-drop">
            <div>
              {file.name.length > 30
                ? file.name.substring(0, 30) + '...'
                : file.name}{' '}
              ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
            <div className='action-buttons'>
              <div style={{ marginRight: '12px' }}>
                <select
                  id={`mriSelect-${idx}`}
                  onChange={(e) => {
                    const selectBox = document.getElementById(
                      `mriSelect-${idx}`
                    );
                    const selectedValue =
                      selectBox.options[selectBox.selectedIndex].value;
                    props.setFiles((fs) => {
                      fs[idx].mriType = selectedValue;
                      return fs;
                    });
                  }}
                >
                  <option value="" defaultValue></option>
                  <option value="t1">T1</option>
                  <option value="t2">T2</option>
                </select>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => {
                  props.setFiles((files) =>
                    files.filter((f) => f.name !== file.name)
                  );
                }}
              >
                <Delete style={{ color: '#707070' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviewCard;
