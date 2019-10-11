import React from "react";
import SelectMultiple from "../generics/SelectMultiple";

export default function WeaponsFilter({weapons, setWeapons, choices}) {
  return (
    <SelectMultiple
      label="Types d'armes"
      values={weapons}
      setValues={setWeapons}
      choices={choices.map(value => ({value, label: value}))}
    />
  );
}