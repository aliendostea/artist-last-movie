import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { artistsActions } from "../../../store";
import {
  setEndpointSearchImgPerson,
  setEndpointSearchPerson,
} from "../../../services/endpoints/endpointSearchPerson";
import { motion } from "framer-motion";
import style from "./ResultsItems.module.scss";
import Card from "../../UI/Cards/Card";
import LastElementScroll from "../../UI/InfiniteScroll/LastElementScroll";
import useInfiniteScrolling from "../../../hooks/use-infinite-scrolling";
import useHttp from "../../../hooks/use-http";

const ResultsItems = ({ items }) => {
  const dispatch = useDispatch();
  const { sendRequest: fetchTasks } = useHttp();
  const { search } = useSelector((state) => state.search);
  const artistsState = useSelector((state) => state.artists);
  const endpointUsers = setEndpointSearchPerson(search, 2);
  const { lastElementRef } = useInfiniteScrolling(endpointUsers);
  const isItemsEmpty = items.length === 0;
  let spanElement;

  if (items?.length === 0)
    spanElement = <span className={style.empty}> No Artist found </span>;

  if (search === "" && items?.length === 0)
    spanElement = <span className={style.empty}> Start typing</span>;

  const setResultsRequestImg = (imgs) => {
    dispatch(artistsActions.setArtistImgSelected(imgs.profiles));
  };

  const handleClick = (id) => {
    const endpointImgArtist = setEndpointSearchImgPerson(id);

    fetchTasks({ url: endpointImgArtist }, setResultsRequestImg);
    dispatch(artistsActions.setArtistSelected(id));
  };

  const handleClickLikeButton = (id) => {
    const [likedArtist] = artistsState.artists.filter(
      (element) => element.id === id
    );

    dispatch(artistsActions.setArtistLikes(likedArtist));
  };

  return (
    <motion.div key="result" exit={{ opacity: 0 }} className={style.parent}>
      {items?.map((item) => (
        <Card
          key={item.id}
          link={`/details/${item.id}`}
          title={item.name}
          popularity={item.popularity}
          imgRoute={item.img}
          liked={item.liked}
          onClick={(e) => handleClick(item.id)}
          onClickButton={(e) => handleClickLikeButton(item.id)}
        />
      ))}

      <LastElementScroll
        lastElementRef={lastElementRef}
        isItemsEmpty={isItemsEmpty}
      />
      {spanElement && spanElement}
    </motion.div>
  );
};

export default ResultsItems;
