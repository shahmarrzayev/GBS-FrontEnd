import { useEffect, useState } from "react";

/**
 * Runs an API call and tracks its loading/error state.
 *
 * `fetcher` receives `{ signal }` and must pass it to the api helpers so that a
 * request is aborted when deps change or the component unmounts.
 *
 * @param {(options: { signal: AbortSignal }) => Promise<unknown>} fetcher
 * @param {unknown[]} deps re-runs the request when these change
 */
export function useApi(fetcher, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setState((previous) => ({ ...previous, loading: true, error: null }));

    fetcher({ signal: controller.signal })
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        // An aborted request is a superseded one, not a failure to report.
        if (!active || controller.signal.aborted) return;
        setState({ data: null, loading: false, error });
      });

    return () => {
      active = false;
      controller.abort();
    };
    // `fetcher` is intentionally excluded: callers pass an inline closure and
    // declare its real inputs through `deps`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
