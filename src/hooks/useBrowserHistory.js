import { useEffect } from 'react';
import { useAppHistory, useAppDispatch } from '../AppStateProvider';


export default function useBrowserHistory(route) {
  const history = useAppHistory();

  useScrollOnRouteChange(route);
  useHistoryListener(route, history);
}


function useScrollOnRouteChange(route) {
  useEffect(function scrollToTop() {
    document.documentElement.scrollTo(0, 0);
  }, [route.path]);
}


function useHistoryListener(route, history) {
  const dispatch = useAppDispatch();

  useEffect(function () {

    const unlisten = history.listen((location, action) => {
      console.log(action, location.pathname, location.state);

      dispatch({
        type: 'SET_ROUTE',
        data: location.state
      });
    });

    return unlisten;
  }, [route.path, dispatch, history]);
}
