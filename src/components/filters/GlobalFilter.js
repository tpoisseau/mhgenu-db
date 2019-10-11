import React from 'react';

import SwatchPicker from "../generics/SwatchPicker";
import {useGlobalContext} from "../../contexts/global";

import QuestFilter from "./QuestFilter";
import ArmorsFilter from "./ArmorsFilter";
import WeaponsFilter from "./WeaponsFilter";

import * as d from '../../data';

export default function GlobalFilter() {
  const [{
    selectedLevelVillage,
    selectedLevelGuild,
    selectedLevelArena,
    selectedLevelPermit,
    selectedHunterType,
    selectedObjectType,
    selectedWeaponsBlademasterTypes,
    selectedWeaponsGunnerTypes,
    selectedArmorsPieces,
  }, dispatch] = useGlobalContext();
  
  const setDispatch = (key) => (value) => dispatch({type: key, value});
  const setSelectedLevelVillage = setDispatch('selectedLevelVillage');
  const setSelectedLevelGuild = setDispatch('selectedLevelGuild');
  const setSelectedLevelArena = setDispatch('selectedLevelArena');
  const setSelectedLevelPermit = setDispatch('selectedLevelPermit');
  const setSelectedHunterType = setDispatch('selectedHunterType');
  const setSelectedObjectType = setDispatch('selectedObjectType');
  const setSelectedWeaponsBlademasterTypes = setDispatch('selectedWeaponsBlademasterTypes');
  const setSelectedWeaponsGunnerTypes = setDispatch('selectedWeaponsGunnerTypes');
  const setSelectedArmorsPieces = setDispatch('selectedArmorsPieces');
  
  const [selectedWeaponsTypes, setSelectedWeaponsTypes] = selectedHunterType === d.HUNTER_TYPE_BLADEMASTER
    ? [selectedWeaponsBlademasterTypes, setSelectedWeaponsBlademasterTypes]
    : [selectedWeaponsGunnerTypes, setSelectedWeaponsGunnerTypes];
  
  return (
    <section className="g-filter"  dir="ltr">
      <article className="g-filter-quests ms-Grid">
        <div className="ms-Grid-row">
          <QuestFilter className="ms-Grid-col ms-sm12 ms-md6" type="Village"
                       level={selectedLevelVillage} setLevel={setSelectedLevelVillage}/>
          <QuestFilter className="ms-Grid-col ms-sm12 ms-md6" type="Guild"
                       level={selectedLevelGuild} setLevel={setSelectedLevelGuild}/>
        </div>
        <div className="ms-Grid-row mt-1">
          <QuestFilter className="ms-Grid-col ms-sm12 ms-md6" type="Arena"
                       level={selectedLevelArena} setLevel={setSelectedLevelArena} empty={true}/>
          <QuestFilter className="ms-Grid-col ms-sm12 ms-md6" type="Permit"
                       level={selectedLevelPermit} setLevel={setSelectedLevelPermit} empty={true}/>
        </div>
      </article>
      <article className="g-filter-object ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md6">
            <SwatchPicker
              label="Type de chasseur : "
              value={selectedHunterType} setValue={setSelectedHunterType}
              choices={d.HUNTER_TYPES.map(value => ({value}))}
            />
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6">
            <SwatchPicker
              label="Type d'équipement : "
              value={selectedObjectType} setValue={setSelectedObjectType}
              choices={d.OBJECTS_TYPES.map(value => ({value}))}
            />
          </div>
  
          <div className="ms-Grid-col ms-sm12">
            {
              selectedObjectType === d.OBJECT_TYPE_ARMOR
                ? <ArmorsFilter
                  pieces={selectedArmorsPieces}
                  setPieces={setSelectedArmorsPieces}/>
                : <WeaponsFilter
                  weapons={selectedWeaponsTypes}
                  setWeapons={setSelectedWeaponsTypes}
                  choices={d.WEAPONS_BY_HUNTER_TYPES[selectedHunterType]}/>
            }
          </div>
        </div>
      </article>
    </section>
  )
}