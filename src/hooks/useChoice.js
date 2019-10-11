import {useState} from 'react';

/**
 * @template T
 *
 * @param {T[]} choices - your list of choices
 * @param {T} [initChoice] - your initial choice, default first in choices
 *
 * @returns {[T, function, function]} [currentChoice, next, setChoice]
 *  call next for impact currentChoice
 *  call setChoice with a valid choice for impact currentChoice
 */
export default function useChoice(choices, initChoice) {
  const [index, setIndex] = useState(initChoice ? choices.indexOf(initChoice) : 0);
  
  function next() {
    setIndex((index + 1) % choices.length);
  }
  
  function setChoice(choice) {
    setIndex(choices.indexOf(choice));
  }
  
  return [choices[index], next, setChoice];
}