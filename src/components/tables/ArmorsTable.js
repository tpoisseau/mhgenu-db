import React from 'react';
import useApi from "../../hooks/useApi";
import SortableTable from "./SortableTable";

const columns = [
  {key: 'item_name_fr', fieldName: 'item_name_fr', name: 'Nom', isSortable: true, isRowHeader: true, isResizable: true},
  {key: 'family_name_fr', fieldName: 'family_name_fr', name: 'Set', isSortable: true, isResizable: true, minWidth: 115},
  {key: 'armor_slot', fieldName: 'armor_slot', name: 'Emplacement', isSortable: true, isResizable: true, minWidth: 115},
  {key: 'armor_defense', fieldName: 'armor_defense', name: 'Déf', isSortable: true, isResizable: true, minWidth: 50},
  {key: 'armor_max_defense', fieldName: 'armor_max_defense', name: 'Déf max', isSortable: true, isResizable: true, minWidth: 85},
  {key: 'armor_fire_res', fieldName: 'armor_fire_res', name: 'Rés feu', isSortable: true, isResizable: true, minWidth: 80},
  {key: 'armor_thunder_res', fieldName: 'armor_thunder_res', name: 'Rés foudre', isSortable: true, isResizable: true, minWidth: 100},
  {key: 'armor_dragon_res', fieldName: 'armor_dragon_res', name: 'Rés dragon', isSortable: true, isResizable: true, minWidth: 100},
  {key: 'armor_water_res', fieldName: 'armor_water_res', name: 'Rés eau', isSortable: true, isResizable: true, minWidth: 80},
  {key: 'armor_ice_res', fieldName: 'armor_ice_res', name: 'Rés glace', isSortable: true, isResizable: true, minWidth: 100},
];

export default function ArmorsTable({Village, Guild, Arena, Permit, HunterType, Pieces}) {
  const {data: items, error, isLoading, isError} = useApi('http://localhost:3001/search/armor', {
    method: 'POST',
    body: JSON.stringify({Village, Guild, Arena, Permit, HunterType, Pieces}),
  }, [Village, Guild, Arena, Permit, HunterType, Pieces]);
  
  if (isError) return <p>
    {error.stack}
  </p>;
  
  return (<SortableTable
    enableShimmer={isLoading || (items && items.length === 0)}
    columns={columns}
    items={items}
  />);
}