import { useAppHistory } from '../AppStateProvider';

export default function useRouter() {
  const history = useAppHistory();

  return function setRoute(route) {
    history.push('/' + route.path, route);
  }
}
