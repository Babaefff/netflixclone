import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import Card from "./Card";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../Utils/firebase-config";
import { getUserLikedMovies } from "../Store";
import { useDispatch, useSelector } from "react-redux";

const CardSlider = React.memo(({ title, data }) => {
  const dispatch = useDispatch();
  const likedMovies = useSelector((state) => state.netflix.likedMovies);
  console.log(likedMovies,"likedMoviesx")

  const [showControllers, setShowControllers] = useState(false);
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const handleDirection = (direction) => {
    700;
    let distance = listRef.current.getBoundingClientRect().x - 70;

    if (direction === "left" && sliderPosition > 0) {
      630;
      listRef.current.style.transform = `translateX(${270 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 5) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);
  return (
    <Container
      className="flex column"
      onMouseEnter={() => setShowControllers(true)}
      onMouseLeave={() => setShowControllers(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControllers ? "none" : ""
          } flex j-center a-center `}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="flex slider" ref={listRef}>
          {data.map((movie, index) => {
            
           
            if (likedMovies?.some(likedMovie => likedMovie.name === movie.name)) {
              return (
                <Card
                  movieData={movie}
                  index={index}
                  key={movie.id}
                  like={true}
                />
              );
            } else {
              return (
                <Card
                  movieData={movie}
                  index={index}
                  key={movie.id}
                  like={false}
                />
              );
            }
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControllers ? "none" : ""
          } flex j-center a-center `}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      /* display: none; */
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;
export default CardSlider;
