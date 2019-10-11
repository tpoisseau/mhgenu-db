import React from 'react';
import {useGlobalContext} from "../../contexts/global";

export default function DebugGlobals() {
  const [state] = useGlobalContext();
  
  return (
    <ul>
      {Object.entries(state).map(([key, value]) => (
        <li key={key}>{key}: {Array.isArray(value) ? value.join(', ') : value}</li>
      ))}
    </ul>
  )
}