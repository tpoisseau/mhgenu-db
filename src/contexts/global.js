import buildContext from "./buildContext";
import * as d from "../data";

const context = buildContext({
  selectedLevelVillage: 1,
  selectedLevelGuild: 1,
  selectedLevelArena: 0,
  selectedLevelPermit: 0,
  selectedHunterType: d.HUNTER_TYPES_DEFAULT,
  selectedObjectType: d.OBJECT_TYPE_ARMOR,
  selectedWeaponsBlademasterTypes: [],
  selectedWeaponsGunnerTypes: [],
  selectedArmorsPieces: [],
}, globalReducer);

export const GlobalContext = context.StateContext;
export const GlobalProvider = context.StateProvider;
export const useGlobalContext = context.useStateValue;

export function globalReducer(state, action) {
  return {...state, [action.type]: action.value};
}