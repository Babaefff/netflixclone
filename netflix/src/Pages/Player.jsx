import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video.mp4";
import { useLocation, useNavigate } from "react-router-dom";

const Player = () => {
  const location = useLocation();
  const {key} = location.state;
  

  const navigate = useNavigate();


  


  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <iframe
                src={`https://www.youtube.com/embed/${key}?&mute=1&autoplay=1`}
                allow="autoplay"
                
              ></iframe>
      </div>
    </Container>
  );
};

const Container = styled.div`
.player{
    width: 100vw;
    height: 100vh;
    .back{
        position: absolute;
        padding: 2rem;
        z-index: 1;
        svg{
            font-size: 3rem;
            cursor: pointer;
        }
        
    }
    video,iframe{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
`;
export default Player;
