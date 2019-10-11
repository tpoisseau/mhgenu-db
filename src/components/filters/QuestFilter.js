import React from 'react';

import Select from "../generics/Select";
import useApi from "../../hooks/useApi";

export default function QuestFilter({level, setLevel, type, empty=false, className}) {
  const {data: levels = [], isLoading, isError, error} = useApi(`http://localhost:3001/quests/${type}`);
  
  if (isError)
    return (
      <details>
        <summary>Error during loading</summary>
        <pre>{error.stack}</pre>
      </details>
    );
  
  const choices = levels.map(l => ({value: l}));
  empty && choices.unshift({value:0});
  
  function formatOptionLabel({value}) {
    return value ? (<>
      <span>{value}</span>
      <span role="img" aria-label="star">⭐</span>
    </>) : <span>--- vide ---</span>
  }
  
  return (
    <div className={className}>
      <Select
        label={`Quêtes ${type} : `}
        value={level}
        setValue={setLevel}
        choices={choices}
        formatOptionLabel={formatOptionLabel}
        isLoading={isLoading}
      />
    </div>
  )
}