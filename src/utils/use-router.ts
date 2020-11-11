import { useMemo } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

export function getUrlParams(url: string) {
  if (!url) return {};
  const search = url.substring(url.indexOf('?') + 1);
  return search
    .split('&')
    .reduce<{ [key: string]: string }>((params, search) => {
      const [key, value] = search.split('=');
      params[key] = value;
      return params;
    }, {});
}

function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...getUrlParams(location.search),
        ...params,
      } as { [key: string]: any },
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}

export default useRouter;
