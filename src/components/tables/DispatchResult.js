import React from 'react';
import {useGlobalContext} from "../../contexts/global";
import * as d from '../../data';
import ArmorsTable from "./ArmorsTable";
import WeaponsTable from "./WeaponsTable";

export default function DispatchResult() {
  const [state] = useGlobalContext();
  
  if (state.selectedObjectType === d.OBJECT_TYPE_ARMOR) {
    return (
      <ArmorsTable
        Village={state.selectedLevelVillage}
        Guild={state.selectedLevelGuild}
        Arena={state.selectedLevelArena}
        Permit={state.selectedLevelPermit}
        HunterType={state.selectedHunterType}
        Pieces={state.selectedArmorsPieces}
      />
    )
  }
  
  if (state.selectedObjectType === d.OBJECT_TYPE_WEAPON) {
    return (
      <WeaponsTable
        Village={state.selectedLevelVillage}
        Guild={state.selectedLevelGuild}
        Arena={state.selectedLevelArena}
        Permit={state.selectedLevelPermit}
        Weapons={
          state.selectedHunterType === d.HUNTER_TYPE_BLADEMASTER
            ? state.selectedWeaponsBlademasterTypes
            : state.selectedWeaponsGunnerTypes
        }
      />
    )
  }
  
  return (
    <p>
      Not Implemented
    </p>
  );
}