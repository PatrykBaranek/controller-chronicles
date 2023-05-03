import styled from 'styled-components';
import isDesktopWidth from '../../../utils/isDesktopWidth';
import useWindowWidth from '../../../hooks/useWindowWidth';
import FilterSlider from './FilterSlider';
import FilterDropdown from './FilterDropdown';

const StyledFilter = styled.div`
  @media screen and (min-width: 900px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    width: 100%;
    padding-inline: 1rem;
  }
`;

const categories = [
  'all',
  '1123',
  '2123',
  '3123',
  '4123123',
  '5123123',
  '1123123',
];

const Filter = () => {
  const windowWidth = useWindowWidth();
  return (
    <StyledFilter>
      {isDesktopWidth(windowWidth) && <FilterSlider data={categories} />}
      {!isDesktopWidth(windowWidth) && (
        <FilterDropdown categories={categories} />
      )}
    </StyledFilter>
  );
};

export default Filter;
