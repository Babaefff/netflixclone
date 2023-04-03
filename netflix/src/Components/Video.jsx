import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";

const Video = () => {
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <iframe
         
          src="https://www.youtube.com/embed/cYX2_lDYZpI?autoplay=1&mute=1" allow="autoplay"
        ></iframe>
        {/* <video src="https://api.themoviedb.org/3/movie/603692/videos?api_key=5359c33eadf5a54a2133a7762885f152&language=en-US" autoPlay loop controls muted></video> */}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video,iframe {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

export default Video;
