import useStore from '#/store/store';
import styled from 'styled-components';
import FilterDrawer from '../FilterDrawer/FilterDrawer';

export type SortKey = '-popularity' | '-released' | '-rating' | 'name';

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Popular', value: '-popularity' },
  { label: 'New', value: '-released' },
  { label: 'Top rated', value: '-rating' },
  { label: 'A–Z', value: 'name' },
];

const StyledBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;

  .label {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.secondary};
    margin-right: 0.2rem;
  }
  .spacer {
    flex: 1;
  }
`;

type ChipProps = { $active: boolean };

const StyledChip = styled.button<ChipProps>`
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: 0.5rem 1rem;
  border-radius: 100vw;
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.primary)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.secondaryGradient : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid
    ${({ $active }) => ($active ? 'transparent' : 'rgba(255, 255, 255, 0.12)')};
  box-shadow: ${({ theme, $active }) => ($active ? theme.shadows?.softGlow : 'none')};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    border-color: rgba(0, 235, 255, 0.4);
  }
`;

const StyledFiltersButton = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding: 0.5rem 1.1rem;
  border-radius: 100vw;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.inputGradient};
  border: 1px solid rgba(0, 235, 255, 0.35);
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows?.softGlow};
  }
`;

type Props = {
  ordering: SortKey;
  onOrderingChange: (value: SortKey) => void;
};

const GamesControlBar = ({ ordering, onOrderingChange }: Props) => {
  const { toggleFiltersOpen } = useStore();

  return (
    <StyledBar>
      <span className='label'>Sort</span>
      {SORT_OPTIONS.map((option) => (
        <StyledChip
          key={option.value}
          type='button'
          $active={ordering === option.value}
          onClick={() => onOrderingChange(option.value)}
        >
          {option.label}
        </StyledChip>
      ))}
      <span className='spacer' />
      <StyledFiltersButton type='button' onClick={toggleFiltersOpen}>
        <span aria-hidden>⚙</span> Filters
      </StyledFiltersButton>
      <FilterDrawer />
    </StyledBar>
  );
};

export default GamesControlBar;
