import { Skeleton } from '@mui/material';
import styled from 'styled-components';

const StyledVideoSliderItem = styled.iframe`
  border-radius: 0.7rem;
  display: block;
  width: 100%;
  border: none;
  height: 55vw;
  @media screen and (min-width: 900px) {
    height: 20vw;
  }
`;

const VideoSliderItem = ({
  link,
  thumbnail,
  title,
}: {
  link: string;
  thumbnail: string;
  title: string;
}) => {
  return (
    <>
      <StyledVideoSliderItem
        src={`${link}?autoplay=1`}
        sandbox='allow-forms allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation'
        allowFullScreen
        srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${link}?autoplay=1><img src=${thumbnail} alt=${title}><span>▶</span></a>`}
        allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay'
      ></StyledVideoSliderItem>
    </>
  );
};

export default VideoSliderItem;
