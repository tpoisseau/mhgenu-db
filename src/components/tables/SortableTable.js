import React, {useEffect} from 'react';
import useStateFromProps from "../../hooks/useStateFromProps";

import {ShimmeredDetailsList} from "office-ui-fabric-react";

import Sequence from "../../utils/Sequence";
import genericCompare from "../../utils/genericCompare";
import factoryDynamicMultiCriteriaComparator from "../../utils/dynamicMultiCriteriaCompare";

const DEFAULT_DATA = [];
const COLUMN_STATE_INIT = {isSorted: false, isSortedDescending: false, priority: 0};
const COLUMN_STATE_ASC = {isSorted: true, isSortedDescending: false};
const COLUMN_STATE_DESC = {isSorted: true, isSortedDescending: true};

export default function SortableTable(props) {
  const {
    columns: columns_,
    items: items_ = DEFAULT_DATA,
    enableShimmer,
    ...shimmeredDetailsListProps
  } = props;
  
  const [columns, setColumns] = useStateFromProps(columns_);
  const [items, setItems] = useStateFromProps(items_);
  
  // overide columns each time columns_ change
  // bind onColumnClick for handle multi-columns-sort first column click sort first,
  // then sort second column where first are equals, etc.
  useEffect(() => {
    const sequence = new Sequence(1);
    
    // handle onClickColumn
    // apply the column ordering priority
    // and the items sorting based on columns axis and priorities
    function onColumnClick(e, column) {
      (typeof column.onColumnClick_ === 'function') && column.onColumnClick_(e, column); // call base onColumnClick
      if (!column.isSortable) return; // ignore non-sortable column
      if (e.isPropagationStopped()) return; // do not sort if stopped
  
      setColumns(columns => { // actual columns instead shadowed const columns of initial state
        column = columns.find(c => c.key === column.key);
    
        // compute priority
        const priority = column.priority || (
          sequence.reset(),
          columns.filter(({isSorted}) => isSorted).forEach(() => sequence.next()),
          sequence.next()
        );
    
        // shift down priority below current column
        columns.filter(({priority: p, key}) => p >= priority && key !== column.key)
          .forEach(c => ++c.priority);
    
        // set sort and priority sort of column
        if (column.isSorted && column.isSortedDescending) {
          Object.assign(column, COLUMN_STATE_INIT);
        } else if (column.isSorted) {
          Object.assign(column, COLUMN_STATE_DESC, {priority});
        } else {
          Object.assign(column, COLUMN_STATE_ASC, {priority});
        }
    
        // fix priority
        sequence.reset();
        const sorted_columns = columns.filter(({isSorted}) => isSorted)
          .sort(({priority: a}, {priority: b}) => genericCompare(a, b))
          // eslint-disable-next-line no-sequences
          .map(c => (c.priority = sequence.next(), c));
        
        setItems(items => items.slice().sort(
          factoryDynamicMultiCriteriaComparator(sorted_columns)
        ));
    
        return columns.slice();
      });
    }
  
    // overide some column property handled by this component
    // onColumnClick: for handle sort
    // replace name property by a name getter for display dynamic name + sort axis and priority
    // move base onColumnClick to onColumnClick_ property (like that onColumnClick can call orig handler)
    // and init sorting state of column. see COLUMN_STATE_INIT
    setColumns(columns => columns.map(c => {
      const {name, onColumnClick: onColumnClick_} = c;
      const column = {...c, onColumnClick_, onColumnClick, ...COLUMN_STATE_INIT};
    
      Object.defineProperty(column, 'name', {
        enumerable: true,
        get() {return name + (this.isSorted ? ` ${this.priority} ` : '')}
      });
    
      return column;
    }))
  // eslint-disable-next-line
  }, [columns_]);
  
  return (
    <ShimmeredDetailsList
      enableShimmer={enableShimmer}
      columns={columns}
      items={items}
      
      {...shimmeredDetailsListProps}
    />
  );
}