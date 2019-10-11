import React, {useRef} from "react";
import Select from "react-select";
import {Stack, Text} from "office-ui-fabric-react";

export default function SelectMultiple({
    label, values, setValues, choices = [],
    isLoading=false, formatOptionLabel
}) {
  const select = useRef();
  formatOptionLabel = formatOptionLabel || (({value}) => {
    const option = choices.find(c => c.value === value);
    return (option && option.label) || value;
  });
  
  return (
    <Stack horizontal verticalAlign="center">
      <label onClick={() => select.current.focus()} className="p-3">
        <Text>{label}</Text>
      </label>
      <Stack.Item grow={1}>
        <Select
          captureMenuScroll={false}
          ref={select}
          isMulti={true}
          onChange={values => setValues(values ? values.map(({value}) => value) : [])}
          options={choices}
          value={values.map(value => ({value}))}
          isLoading={isLoading}
          formatOptionLabel={formatOptionLabel}
        />
      </Stack.Item>
    </Stack>
  )
}