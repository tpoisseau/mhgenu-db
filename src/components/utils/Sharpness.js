import React from 'react';

const style = {
  height: 10,
  display: 'inline-block',
};

export function Sharpness({value}) {
  const [red, orange, yellow, green, blue, white, purple] = value.split('.').map(Number);
  
  return (
    <div className="sharpness">
      <span style={{...style, width: red, background: 'red'}}> </span>
      <span style={{...style, width: orange, background: 'orange'}}> </span>
      <span style={{...style, width: yellow, background: 'yellow'}}> </span>
      <span style={{...style, width: green, background: 'green'}}> </span>
      <span style={{...style, width: blue, background: 'blue'}}> </span>
      <span style={{...style, width: white, background: 'lightgrey'}}> </span>
      <span style={{...style, width: purple, background: 'purple'}}> </span>
    </div>
  );
}

export default function WeaponSharpness({value}) {
  return (
    <>
      {value.split(' ').map((v, i) => <Sharpness key={i} value={v} />)}
    </>
  )
}