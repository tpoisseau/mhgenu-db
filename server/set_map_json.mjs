Map.prototype.toJSON = function Map_prototype_toJSON() {
  return Object.fromEntries(this.entries());
};

Set.prototype.toJSON = function Set_prototype_toJSON() {
  return Array.from(this);
};