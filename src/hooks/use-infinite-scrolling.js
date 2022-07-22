import { useCallback, useState, useEffect, useRef } from "react";
import { pageActions, artistsActions } from "../store";
import { useDispatch, useSelector } from "react-redux";

import useHttp from "./use-http";
import { setEndpointSearchPerson } from "../services/endpoints/endpointSearchPerson";
import { createArtistAdapter } from "../adapters/adaptersArtist";
import debounce from "just-debounce-it";

const useInfiniteScrolling = (
  urlEndpoint,
  lastPageScrolling = 5,
  setTimeoutNumber = 2000
) => {
  const dispatch = useDispatch();
  // const pages = useSelector((state) => state.pages);
  const querySearched = useSelector((state) => state.search);
  const { artists } = useSelector((state) => state.artists);
  const { isLoading, sendRequest: fetchTasks } = useHttp();

  const [isLastPageTriggered, setIsLastPageTriggered] = useState(false);
  const lastElementRef = useRef(null);
  const pageRef = useRef(2);
  const prevYRef = useRef(0);

  // const element = externalRef ? externalRef.current : fromRef.current

  const handleObserver = useCallback(
    debounce((entities) => {
      const boundingClientRectY = entities[0].boundingClientRect.y;

      if (pageRef.current > lastPageScrolling) {
        setIsLastPageTriggered(true);
        return;
      }

      // setTimeout(() => {
      if (prevYRef.current > boundingClientRectY) {
        const setData = (itemsArray) => {
          const { results } = itemsArray;
          const artistRes = results.map((item) => createArtistAdapter(item));
          dispatch(artistsActions.addArtistsToArray({ artists: artistRes }));
        };

        dispatch(pageActions.increasePageNumber());

        // setPage(pageRef.current + 1);
        pageRef.current = pageRef.current + 1;
        const endpointUsers = setEndpointSearchPerson(
          querySearched.search,
          pageRef.current
        );

        fetchTasks({ url: endpointUsers }, setData);
      }
      prevYRef.current = boundingClientRectY;
      // setPrevY(boundingClientRectY);
      // }, setTimeoutNumber);
    }, 1000),
    [
      fetchTasks,
      dispatch,
      debounce,
      lastPageScrolling,
      setTimeoutNumber,
      querySearched.search,
      // pages.page,
    ]
  );

  useEffect(() => {
    if (artists.length < 19) return;

    const optionsObserver = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, optionsObserver);

    if (lastElementRef.current === null) return;

    observer.observe(lastElementRef.current);

    return () => observer && observer.disconnect();
  }, [handleObserver, artists]);

  return {
    isLoading,
    lastElementRef,
    isLastPageTriggered,
  };
};

export default useInfiniteScrolling;
