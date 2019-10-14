import useApi from "../../hooks/useApi";
import SortableTable from "./SortableTable";
import React from "react";
import WeaponSharpness from "../utils/Sharpness";

const columns = [
  {key: 'item_name_fr', fieldName: 'item_name_fr', name: 'Nom', isSortable: true, isRowHeader: true, isResizable: true},
  {key: 'weapon_type', fieldName: 'weapon_type', name: 'Type', isSortable: true, isResizable: true, minWidth: 115},
  {key: 'weapon_attack', fieldName: 'weapon_attack', name: 'Atk', isSortable: true, isResizable: true, minWidth: 115},
  {key: 'weapon_element', fieldName: 'weapon_element', name: 'Elm', isSortable: true, isResizable: true, minWidth: 85},
  {key: 'weapon_element_attack', fieldName: 'weapon_element_attack', name: 'Elm atk', isSortable: true, isResizable: true, minWidth: 80},
  {key: 'weapon_element_2', fieldName: 'weapon_element_2', name: 'Elm 2', isSortable: true, isResizable: true, minWidth: 100},
  {key: 'weapon_element_2_attack', fieldName: 'weapon_element_2_attack', name: 'Elm atk 2', isSortable: true, isResizable: true, minWidth: 100},
  {key: 'weapon_awaken', fieldName: 'weapon_awaken', name: 'awk', isSortable: true, isResizable: true, minWidth: 80},
  {key: 'weapon_awaken_attack', fieldName: 'weapon_awaken_attack', name: 'awk atk', isSortable: true, isResizable: true, minWidth: 100},
  {
    key: 'weapon_sharpness', fieldName: 'weapon_sharpness', name: 'shrp', isSortable: true, isResizable: true, minWidth: 80,
    onRender({weapon_sharpness}) {
      return (
        <WeaponSharpness value={weapon_sharpness} />
      )
    }
  },
  {key: 'weapon_affinity', fieldName: 'weapon_affinity', name: 'afn', isSortable: true, isResizable: true, minWidth: 100},
];

export default function WeaponsTable({Village, Guild, Arena, Permit, Weapons}) {
  const {data: items, error, isLoading, isError} = useApi('http://localhost:3001/search/weapon', {
    method: 'POST',
    body: JSON.stringify({Village, Guild, Arena, Permit, Weapons}),
  }, [Village, Guild, Arena, Permit, Weapons]);
  
  if (isError) return (
    <p>
      {error.stack}
    </p>
  );
  
  return (<SortableTable
    enableShimmer={isLoading || (items && items.length === 0)}
    columns={columns}
    items={items}
  />);
}