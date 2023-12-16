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
  isInDetails = false,
}: {
  link: string;
  thumbnail: string;
  title: string;
  isInDetails?: boolean;
}) => {
  return (
    <>
      <StyledVideoSliderItem
        src={`${link}?autoplay=1`}
        sandbox='allow-forms allow-scripts allow-same-origin allow-pointer-lock allow-top-navigation allow-presentation'
        allowFullScreen
        srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}.title{display: ${
          isInDetails ? 'none' : 'inline'
        }; top:0;bottom:80%; font-size:clamp(1rem, 4vw, 1.5rem); z-index:10}.overlay{display: ${
          isInDetails ? 'none' : 'inline'
        };background:linear-gradient(180deg, rgba(0, 0, 0, 0.37) 0%, rgba(0,0,0,0.10127801120448177) 40%);position:absolute; height:100%; width:100%;}img,span{border-radius: ${
          isInDetails ? '10px' : '0'
        };position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${link}?autoplay=1><img src=${thumbnail} alt='${title}'><span class="title">${title}</span><span>▶</span><span class="overlay"></span></a>`}
        allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay'
      ></StyledVideoSliderItem>
    </>
  );
};

export default VideoSliderItem;
