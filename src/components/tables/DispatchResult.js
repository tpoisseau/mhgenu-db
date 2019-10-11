import React from 'react';
import {useGlobalContext} from "../../contexts/global";
import * as d from '../../data';
import ArmorsTable from "./ArmorsTable";

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
  return <p>
    Not Implemented
  </p>
}