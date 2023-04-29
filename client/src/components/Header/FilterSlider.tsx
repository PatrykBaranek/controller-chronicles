import styled from 'styled-components';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { NavLink } from 'react-router-dom';

const StyledSplide = styled(Splide)`
  ul {
    display: flex;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }
  a.active {
    color: white;
  }
`;

const FilterSlider = ({ data }: { data: Array<any> }) => {
  return (
    <StyledSplide
      options={{
        arrows: false,
        pagination: false,
        isNavigation: true,
        perPage: 8,
        gap: '3rem',
        drag: 'free',
        snap: false,
        easing: 'ease',
        start: 0,
      }}
    >
      {data.map(item => (
        <SplideSlide>
          <NavLink
            key={item}
            className={({ isActive }) => (isActive ? 'active' : '')}
            to={`/games/${item}`}
          >
            {item}
          </NavLink>
        </SplideSlide>
      ))}
    </StyledSplide>
  );
};

export default FilterSlider;
