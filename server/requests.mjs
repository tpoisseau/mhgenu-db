import db from './db.mjs';

export const questLevelsByHub = db.prepare('SELECT stars FROM quests WHERE hub = :hub GROUP BY stars ORDER BY stars').pluck();

// récuperer tout les items récuperable par les quêtes concernés : quest_rewards
const itemsFromQuestRewardsByQuestLevels = db.prepare(`
SELECT DISTINCT qr.item_id
FROM quests AS q
INNER JOIN quest_rewards AS qr on qr.quest_id = q._id
WHERE (q.hub = 'Village' and q.stars <= :Village)
   OR (q.hub = 'Guild' and q.stars <= :Guild)
   OR (q.hub = 'Arena' and q.stars <= :Arena)
   OR (q.hub = 'Permit' and q.stars <= :Permit)
`).pluck();

// récuperer tout les items récupérable sur la carte des quêtes concernés : gathering
const itemsFromGatheringByQuestLevels = db.prepare(`
SELECT DISTINCT g.item_id
FROM quests AS q
INNER JOIN gathering AS g ON q.location_id = g.location_id
                         AND q.rank = g.rank -- don't count irrelevant gathering
WHERE 0 = 1
   OR (q.hub = 'Village' and q.stars <= :Village)
   OR (q.hub = 'Guild' and q.stars <= :Guild)
   OR (q.hub = 'Arena' and q.stars <= :Arena)
   OR (q.hub = 'Permit' and q.stars <= :Permit)
`).pluck();

// récuperer tout les items récuperable par les monstres des quêtes concernés : hunting_rewards
const itemsFromHuntingByQuestLevels = db.prepare(`
SELECT DISTINCT hr.item_id
FROM quests AS q
INNER JOIN monster_to_quest AS mtq ON q._id = mtq.quest_id
INNER JOIN hunting_rewards AS hr ON mtq.monster_id = hr.monster_id
                                AND q.rank = hr.rank -- don't count irrelevant hunting
WHERE mtq.unstable != 1
  AND ( 0 = 1
   OR (q.hub = 'Village' and q.stars <= :Village)
   OR (q.hub = 'Guild' and q.stars <= :Guild)
   OR (q.hub = 'Arena' and q.stars <= :Arena)
   OR (q.hub = 'Permit' and q.stars <= :Permit)
  )
`).pluck();

function findArmorsPiecesByHunterType({HunterType, Pieces}) {
  const params = Array(Pieces.length).fill('?').join(', ');
  
  return db.prepare(`
  SELECT
    a._id AS armor_id,
    a.slot AS armor_slot,
    a.defense AS armor_defense,
    a.max_defense AS armor_max_defense,
    a.fire_res AS armor_fire_res,
    a.thunder_res AS armor_thunder_res,
    a.dragon_res AS armor_dragon_res,
    a.water_res AS armor_water_res,
    a.ice_res AS armor_ice_res,
    a.gender AS armor_gender,
    a.hunter_type AS armor_hunter_type,
    a.num_slots AS armor_num_slots,
    a.family AS armor_family,
    i._id AS item_id,
    i.name AS item_name,
    i.name_de AS item_name_de,
    i.name_fr AS item_name_fr,
    i.name_es AS item_name_es,
    i.name_it AS item_name_it,
    i.name_ja AS item_name_ja,
    i.type AS item_type,
    i.sub_type AS item_sub_type,
    i.rarity AS item_rarity,
    i.carry_capacity AS item_carry_capacity,
    i.buy AS item_buy,
    i.sell AS item_sell,
    i.description AS item_description,
    i.description_de AS item_description_de,
    i.description_fr AS item_description_fr,
    i.description_es AS item_description_es,
    i.description_it AS item_description_it,
    i.description_ja AS item_description_ja,
    i.icon_name AS item_icon_name,
    i.icon_color AS item_icon_color,
    i.account AS item_account,
    af._id AS family_id,
    af.name AS family_name,
    af.name_de AS family_name_de,
    af.name_fr AS family_name_fr,
    af.name_es AS family_name_es,
    af.name_it AS family_name_it,
    af.name_ja AS family_name_ja,
    af.rarity AS family_rarity,
    af.head_id AS family_head_id,
    af.body_id AS family_body_id,
    af.arms_id AS family_arms_id,
    af.waist_id AS family_waist_id,
    af.legs_id AS family_legs_id,
    af.hunter_type AS family_hunter_type
  FROM armor AS a
  INNER JOIN armor_families AS af ON a.family = af._id
  INNER JOIN items i on a._id = i._id
  WHERE slot IN (${params})
    AND a.hunter_type IN (:HunterType, 2)
  `).all(Pieces, {HunterType})
}


function findWeaponsByHunterType({Weapons}) {
  const params = Array(Weapons.length).fill('?').join(', ');
  
  return db.prepare(`
  SELECT
  w._id AS weapon_id,
  w.parent_id AS weapon_parent_id,
  w.wtype AS weapon_type,
  w.creation_cost AS weapon_creation_cost,
  w.upgrade_cost AS weapon_upgrade_cost,
  w.attack AS weapon_attack,
  w.max_attack AS weapon_max_attack,
  w.element AS weapon_element,
  w.element_attack AS weapon_element_attack,
  w.element_2 AS weapon_element_2,
  w.element_2_attack AS weapon_element_2_attack,
  w.awaken AS weapon_awaken,
  w.awaken_attack AS weapon_awaken_attack,
  w.defense AS weapon_defense,
  w.sharpness AS weapon_sharpness,
  CAST(w.affinity AS INTEGER) AS weapon_affinity,
  w.horn_notes AS weapon_horn_notes,
  w.shelling_type AS weapon_shelling_type,
  w.phial AS weapon_phial,
  w.charges AS weapon_charges,
  w.coatings AS weapon_coatings,
  w.recoil AS weapon_recoil,
  w.reload_speed AS weapon_reload_speed,
  w.rapid_fire AS weapon_rapid_fire,
  w.deviation AS weapon_deviation,
  w.ammo AS weapon_ammo,
  w.special_ammo AS weapon_special_ammo,
  w.num_slots AS weapon_num_slots,
  w.tree_depth AS weapon_tree_depth,
  w.final AS weapon_final,
  w.family AS weapon_family,
  i._id AS item_id,
  i.name AS item_name,
  i.name_de AS item_name_de,
  i.name_fr AS item_name_fr,
  i.name_es AS item_name_es,
  i.name_it AS item_name_it,
  i.name_ja AS item_name_ja,
  i.type AS item_type,
  i.sub_type AS item_sub_type,
  i.rarity AS item_rarity,
  i.carry_capacity AS item_carry_capacity,
  i.buy AS item_buy,
  i.sell AS item_sell,
  i.description AS item_description,
  i.description_de AS item_description_de,
  i.description_fr AS item_description_fr,
  i.description_es AS item_description_es,
  i.description_it AS item_description_it,
  i.description_ja AS item_description_ja,
  i.icon_name AS item_icon_name,
  i.icon_color AS item_icon_color,
  i.account AS item_account
  FROM weapons AS w
  INNER JOIN items i on w._id = i._id
  WHERE w.wtype IN (${params})
  `).all(Weapons)
}

const itemsForCompose = db.prepare(`
SELECT DISTINCT component_item_id
FROM components
WHERE created_item_id = ?
`).pluck();

function mergeSets(baseSet, ...sets) {
  for (const set of sets) {
    if (!(set instanceof Set)) {
      baseSet.add(set);
      continue;
    }
    
    for (const value of set) {
      baseSet.add(value)
    }
  }
  
  return baseSet;
}

function diffSet(baseSet, minusSet) {
  const set = new Set();
  
  for (const item of baseSet) {
    if (minusSet.has(item)) {
      set.add(item);
    }
  }
  
  return set;
}

function includeSet(baseSet, testSet) {
  for (const item of testSet) {
    if (!baseSet.has(item)) return false;
  }
  
  return true;
}

export function decomposeItemInSet(item_id) {
  if (decomposeItemInSet.cache.has(item_id)) return decomposeItemInSet.cache.get(item_id);
  
  const result = itemsForCompose.all(item_id).reduce((set, item_id) => {
      const items = decomposeItemInSet(item_id);
      return mergeSets(set, items.length > 0 ? items : item_id);
    },
    new Set(),
  );
  
  result.size || result.add(item_id);
  decomposeItemInSet.cache.set(item_id, result);
  
  return result;
}

decomposeItemInSet.cache = new Map();

export function findLootableByQuests({Village, Guild, Arena, Permit}) {
  // récuperer tout les items récuperable par les quêtes concernés : quest_rewards
  const itemsQuestRewards = itemsFromQuestRewardsByQuestLevels.all({Village, Guild, Arena, Permit});
  // récuperer tout les items récupérable sur la carte des quêtes concernés : gathering
  const itemsGathering = itemsFromGatheringByQuestLevels.all({Village, Guild, Arena, Permit});
  // récuperer tout les items récuperable par les monstres des quêtes concernés : hunting_rewards
  const itemsHunt = itemsFromHuntingByQuestLevels.all({Village, Guild, Arena, Permit});
  
  return mergeSets(
    ...[itemsQuestRewards, itemsGathering, itemsHunt].map(i => new Set(i))
  );
}

export function findArmorPiecesByHubLevelsAndHunterType({Village, Guild, Arena, Permit, HunterType, Pieces}) {
  // faire la différence entre ce qui est récoltable et ce qui est necessaire pour le craft de l'arme
  const lootableItems = findLootableByQuests({Village, Guild, Arena, Permit});
  
  // récuperer toutes les pièces d'armures (filtré par Pieces) portable par HunterType : armor
  const pieces = findArmorsPiecesByHunterType({HunterType, Pieces});
  
  // retourner la liste des armures craftables
  return pieces
    // décomposer les pièces en composants le plus petit possibles (descendre la / les séquences de craft possible) : components
    .map(pieces => (pieces.neededItems = decomposeItemInSet(pieces.armor_id), pieces))
    .filter(({neededItems}) => includeSet(lootableItems, neededItems));
}

export function findWeaponsByHubLevelsAndHunterType({Village, Guild, Arena, Permit, Weapons}) {
  // faire la différence entre ce qui est récoltable et ce qui est necessaire pour le craft de l'arme
  const lootableItems = findLootableByQuests({Village, Guild, Arena, Permit});
  
  // récuperer toutes les pièces d'armures (filtré par Pieces) portable par HunterType : armor
  const weapons = findWeaponsByHunterType({Weapons});
  
  // retourner la liste des armes craftables
  return weapons
    // décomposer les pièces en composants le plus petit possibles (descendre la / les séquences de craft possible) : components
    .map(w => (w.neededItems = decomposeItemInSet(w.weapon_id), w))
    .filter(({neededItems}) => includeSet(lootableItems, neededItems));
}