import React from 'react';

export default function Toggle({isChecked, toggle, label, labelValue}) {
  return (
    <label>
      {label}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggle}
      />
      {labelValue}
    </label>
  )
}