import React from 'react';
import Style from './CustomCheckboxes.module.css'; // Make sure to import the CSS file

function CustomCheckboxe({ checked, onChange }) {
  const toggleCheckbox = () => {
    onChange(!checked);
  };

  return (
    <div className={Style.customcheckbox} style={{ border: checked ? '2px solid #2196F3' : '2px solid #ccc', backgroundColor: checked ? '#f0f0f0' : 'transparent' }} onClick={toggleCheckbox}>
      <input type="checkbox" checked={checked} onChange={toggleCheckbox} />
      {checked && <span className={Style.checkmark}>&#10004;</span>}
    </div>
  );
}

export default CustomCheckboxe;
