import { BrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import customHistory from '../utils/history';

export interface CustomRouterProps {
   basename?: string;
   children: React.ReactNode;
   history: BrowserHistory
}

export default function CustomRouter({ basename, children, history }: CustomRouterProps) {
   const [state, setState] = useState({
      action: history.action,
      location: history.location
   })
   useLayoutEffect(() => history.listen(setState), [history])
   return (
      <Router
         navigator={customHistory}
         location={state.location}
         navigationType={state.action}
         children={children}
         basename={basename}
      />
   );
}

