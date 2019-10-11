import React, {useRef} from "react";
import RSelect from "react-select";
import {Stack, Text} from "office-ui-fabric-react";

export default function Select({label, value, setValue, choices = [], isLoading=false, formatOptionLabel}) {
  const select = useRef();
  
  return (
    <Stack horizontal verticalAlign="center">
      <label onClick={() => select.current.focus()} className="p-3">
        <Text>{label}</Text>
      </label>
      <Stack.Item grow={1}>
        <RSelect
          captureMenuScroll={false}
          ref={select}
          value={{value: value}}
          onChange={({value}) => setValue(value)}
          options={choices}
          formatOptionLabel={formatOptionLabel}
          isLoading={isLoading}
        />
      </Stack.Item>
    </Stack>
  )
}