import React from 'react';
import SelectMultiple from "../generics/SelectMultiple";
import * as d from '../../data';

export default function ArmorsFilter({pieces, setPieces}) {
  return (
    <SelectMultiple
      label="Pièces d'armures"
      values={pieces}
      setValues={setPieces}
      choices={d.ARMOR_PIECES.map((value) => ({value, label: value}))}
    />
  );
}