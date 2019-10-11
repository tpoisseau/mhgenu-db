import React from 'react';
import './App.css';

import {GlobalProvider} from './contexts/global';

import GlobalFilter from "./components/filters/GlobalFilter";
import DebugGlobals from "./components/tables/DebugGlobals";
import DispatchResult from "./components/tables/DispatchResult";

function App() {
  return (
    <GlobalProvider>
      <div className="ms-sm12 ms-md10 ms-lg9 App mt-5">
        <GlobalFilter />
        <DispatchResult />
        <DebugGlobals />
      </div>
    </GlobalProvider>
  );
}

export default App;
