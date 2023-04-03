import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../Utils/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { addToLiked, removeFromLikedMovies } from "../Store";
import { API_KEY } from "../Utils/constants";

const Card = React.memo(({ movieData, like }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const [addToList, setAddToList] = useState(false);
  const likedMovies = useSelector((state) => state.netflix.likedMovies);
  console.log(likedMovies);

  const handlePlayerClick = () => {
    navigate("/player", { state: { key } });
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (movieData?.mediaType === "movie") {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${API_KEY}`
        )
        .then((response) => {
          const videoKeyCommon = response.data.results;
          const filteredVideoKeyCommon = videoKeyCommon.filter(
            (result) => result.type === "Trailer"
          );

          const videoKey = filteredVideoKeyCommon[0]?.key;

          setKey(videoKey);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${movieData.id}/videos?api_key=${API_KEY}`
        )
        .then((response) => {
          const videoKeyCommon = response.data.results;
          const filteredVideoKeyCommon = videoKeyCommon.filter(
            (result) => result.type === "Trailer"
          );

          const videoKey = filteredVideoKeyCommon[0]?.key;

          setKey(videoKey);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {}, [likedMovies]);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />

            {key ? (
              <iframe
                src={`https://www.youtube.com/embed/${key}?&mute=1&autoplay=1`}
                allow="autoplay"
                onClick={handlePlayerClick}
              ></iframe>
            ) : (
              <video
                src={video}
                autoPlay
                controls
                loop
                muted
                onClick={() => navigate("/player")}
              ></video>
            )}
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={handlePlayerClick}>
              {movieData.name}
            </h3>
            <div className="icons flex column j-between ">
              <div className="controls flex">
                <IoPlayCircleSharp title="play" onClick={handlePlayerClick} />
                <RiThumbUpFill title="like" />
                <RiThumbDownFill title="dislike" />
                {like ? (
                  <BsCheck
                    title="Remove From List"
                    onClick={() =>
                      dispatch(
                        removeFromLikedMovies({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus
                    title="Add to my list"
                    onClick={() => dispatch(addToLiked({ movieData, email }))}
                  />
                )}
                <div className="info">
                  <BiChevronDown title="More Info" />
                </div>
              </div>
              <div className="genres flex">
                <ul className="flex">
                  {movieData.genres.map((genre) => (
                    <li key={genre}>{genre}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;

        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video,
      iframe {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      .icons {
        .controls {
          display: flex;
          gap: 1rem;
        }
        svg {
          font-size: 2rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            color: #b8b8b8;
          }
        }
      }
      .genres {
        ul {
          gap: 1rem;
          li {
            padding-right: 0.7rem;
            &:first-of-type {
              list-style-type: none;
            }
          }
        }
      }
    }
  }
`;

export default Card;
