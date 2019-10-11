import {useEffect, useState} from "react";

export default function useStateFromProps(prop_) {
  const [prop, setProp] = useState(prop_);
  
  useEffect(() => setProp(prop_), [prop_]);
  
  return [prop, setProp];
}