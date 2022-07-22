import React from "react";
import useHttp from "../../../hooks/use-http";
import { setEndpointSearchPerson } from "../../../services/endpoints/endpointSearchPerson";
import { useDispatch, useSelector } from "react-redux";
import { createArtistAdapter } from "../../../adapters/adaptersArtist";
import { createPageAdapter } from "../../../adapters/adaptersPages";
import { artistsActions, searchActions, pageActions } from "../../../store";
import { motion } from "framer-motion";
import ResultsItems from "../ResultsItems/ResultsItems";
import Loader from "../../UI/Loader/Loader";
import style from "./Home.module.scss";
import Form from "../../UI/Form/Form";
import ItemFilter from "../ItemFilter/ItemFilter";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, sendRequest: fetchTasks } = useHttp();
  const artistsState = useSelector((state) => state.artists);
  const querySearched = useSelector((state) => state.search);
  const filter = useSelector((state) => state.filterButton);

  const { page: numberPageToFind } = useSelector((state) => state.pages);

  const setResultsRequest = (res) => {
    const { results } = res;
    const artistRes = results.map((item) => createArtistAdapter(item));
    dispatch(artistsActions.setArtists({ artists: artistRes }));

    const currentPage = createPageAdapter(res);
    dispatch(pageActions.setCurrentPage(currentPage));
  };

  const submitQueryHandler = async (e) => {
    e.preventDefault();
    if (querySearched.search === "") return;

    const endpointUsers = setEndpointSearchPerson(
      querySearched.search,
      numberPageToFind
    );

    fetchTasks({ url: endpointUsers }, setResultsRequest);
  };

  const queryTypedHandler = (e) => {
    dispatch(searchActions.setQuerySearch({ search: e.target.value }));
  };

  const getArtistsWithMoreLikes = () => {
    let sort = null;
    if (filter.moreLikes === false || querySearched.search === "") return sort;
    const newArtistsState = [...artistsState.artists];

    return newArtistsState.sort((a, b) => {
      return b.popularity - a.popularity;
    });
  };

  const sortArtistsAlphabetically = () => {
    let sort = null;

    if (filter.alphabet === false || querySearched.search === "") return sort;
    sort = [...artistsState.artists];

    return sort.sort((a, b) => a.name.localeCompare(b.name));
  };

  const getArtistsByFemaleGender = () => {
    let sort = null;

    if (filter.females === false || querySearched.search === "") return sort;
    sort = [...artistsState.artists];

    return sort.filter((element) => element.gender === 1);
  };

  const getArtistsByMaleGender = () => {
    let sort = null;

    if (filter.males === false || querySearched.search === "") return sort;
    sort = [...artistsState.artists];

    return sort.filter((element) => element.gender === 2);
  };

  const isFilterActiveFunction = () => {
    let isFilterActive = false;
    for (const key in filter) {
      if (filter[key]) return (isFilterActive = filter[key]);
    }
    return isFilterActive;
  };
  const isFilterActive = isFilterActiveFunction();
  const filterMoreLikes = getArtistsWithMoreLikes();
  const filterAlphabetically = sortArtistsAlphabetically();
  const filterArtistsByFemaleGender = getArtistsByFemaleGender();
  const filterArtistsByMaleGender = getArtistsByMaleGender();
  const unfilteredArtists = isFilterActive === false && artistsState.artists;

  let finalResultItems =
    filterMoreLikes ??
    filterAlphabetically ??
    filterArtistsByFemaleGender ??
    filterArtistsByMaleGender ??
    unfilteredArtists ??
    null;
  return (
    <motion.div
      key="loade324r"
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={style["home"]}
    >
      <h1 className={style["home-title"]}>Find your favorite artist</h1>

      <Form onSubmit={submitQueryHandler} onChange={queryTypedHandler} />
      <ItemFilter />

      {isLoading && <Loader />}
      {finalResultItems && <ResultsItems items={finalResultItems} />}
    </motion.div>
  );
};

export default Home;
