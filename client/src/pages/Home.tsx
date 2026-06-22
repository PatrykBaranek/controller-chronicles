import HomeVariantSwitcher from '#/components/Home/HomeVariantSwitcher';
import RailsHome from '#/components/Home/variants/RailsHome';
import BentoHome from '#/components/Home/variants/BentoHome';
import CinematicHome from '#/components/Home/variants/CinematicHome';
import ForYouHome from '#/components/Home/variants/ForYouHome';
import useHomeVariant, { HomeVariant } from '#/hooks/useHomeVariant';
import { ComponentType } from 'react';
import styled from 'styled-components';

const StyledHome = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-inline: clamp(1rem, 4vw, 2.5rem);
  padding-top: 1.5rem;
`;

const VARIANTS: Record<HomeVariant, ComponentType> = {
  rails: RailsHome,
  bento: BentoHome,
  cinematic: CinematicHome,
  foryou: ForYouHome,
};

const Home = () => {
  const [variant, setVariant] = useHomeVariant();
  const ActiveVariant = VARIANTS[variant];

  return (
    <StyledHome>
      <HomeVariantSwitcher variant={variant} onChange={setVariant} />
      <ActiveVariant />
    </StyledHome>
  );
};

export default Home;
