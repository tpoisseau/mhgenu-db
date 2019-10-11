import React from 'react';
import {Stack} from "office-ui-fabric-react";

export default function SwatchPicker({label, value: currentValue, setValue, choices}) {
  return (
    <Stack horizontal verticalAlign="center">
      <Stack.Item key="SwatchPicker-Label" className="p-3">
        {label}
      </Stack.Item>
      {choices.map(({value, label=value}) => (
        <Stack.Item key={value}>
          <button
            className="p-3 mt-1"
            onClick={() => setValue(value)}
            style={{
              borderBottom: value === currentValue ? 'solid 0.25em black' : 'solid 0.25em transparent',
            }}
          >{label}</button>
        </Stack.Item>
      ))}
    </Stack>
  )
}