import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import {
  setEndpointSearchDetailsPerson,
  setEndpointSearchImgPerson,
} from "../../../services/endpoints/endpointSearchPerson";
import { artistsActions } from "../../../store";
import Button from "../../UI/Btn/Button";

import style from "./details.module.scss";
import Card from "../../UI/Cards/Card";
import { useRef } from "react";

const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const imgAnimate = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

const srcImgArtist = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

const Details = () => {
  const { itemId: selectedIdArtist } = useParams();
  const dispatch = useDispatch();
  const { sendRequest: fetchTasks } = useHttp();
  const state = useSelector((state) => state);
  const name = state.artists?.artistSelected?.name;
  const username = state.artists?.artistSelected?.username;
  const famousMovies = state.artists?.artistSelected?.famousMovies;
  const selectedImages = state.artists?.artistImgSelected;
  const divRef = useRef(null);

  useEffect(() => {
    const isEmpty =
      state.artists.artistSelected === undefined ||
      Object.keys(state.artists.artistSelected).length === 0;

    const setResultsRequest = (artist) => {
      dispatch(artistsActions.setArtistDetails(artist));
    };

    const setResultsRequestImg = (imgs) => {
      dispatch(artistsActions.setArtistImgSelected(imgs.profiles));
    };

    if (isEmpty) {
      const endpointArtist = setEndpointSearchDetailsPerson(selectedIdArtist);
      const endpointImgArtist = setEndpointSearchImgPerson(selectedIdArtist);

      fetchTasks({ url: endpointArtist }, setResultsRequest);
      fetchTasks({ url: endpointImgArtist }, setResultsRequestImg);
    }
  }, [state.artists.artistSelected, selectedIdArtist, dispatch]);

  useEffect(() => {
    divRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  return (
    <div ref={divRef} className={style["details"]}>
      <span className={style["details-title"]}> {name}</span>

      <div>
        <motion.div
          className={style["details__img-box-parent"]}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {selectedImages?.map((item) => (
            <motion.figure
              key={item.file_path}
              className={style["details__img-box"]}
              variants={imgAnimate}
            >
              <img
                key={item.file_path}
                src={`${srcImgArtist}${item.file_path}`}
                alt={username}
                loading="lazy"
              />
            </motion.figure>
          ))}

          {selectedImages?.length === 0 && (
            <span className={style["details-span1"]}>
              There are no photos of this artist
            </span>
          )}
        </motion.div>
      </div>
      <div>
        <span className={style["details-title2"]}> Famous Movies</span>

        <div className={style["details-box2"]}>
          {famousMovies?.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              imgRoute={movie.poster_path}
            />
          ))}
          {famousMovies === undefined && (
            <span className={style["details-span1"]}>
              There are no movies of this artist
            </span>
          )}
        </div>
      </div>

      <Link to="/">
        <Button label="Go Home" />
      </Link>
    </div>
  );
};

export default Details;
