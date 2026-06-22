import { HOME_VARIANTS, HomeVariant } from '#/hooks/useHomeVariant';
import styled from 'styled-components';

const LABELS: Record<HomeVariant, string> = {
  rails: 'Rails',
  bento: 'Bento',
  cinematic: 'Cinematic',
  foryou: 'For You',
};

const StyledSwitcher = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.75rem;

  .label {
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.secondary};
    margin-right: 0.3rem;
  }
`;

type ChipProps = { $active: boolean };

const StyledChip = styled.button<ChipProps>`
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: 0.5rem 1.05rem;
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

type Props = {
  variant: HomeVariant;
  onChange: (variant: HomeVariant) => void;
};

const HomeVariantSwitcher = ({ variant, onChange }: Props) => (
  <StyledSwitcher>
    <span className='label'>Layout</span>
    {HOME_VARIANTS.map((value) => (
      <StyledChip
        key={value}
        type='button'
        $active={variant === value}
        onClick={() => onChange(value)}
      >
        {LABELS[value]}
      </StyledChip>
    ))}
  </StyledSwitcher>
);

export default HomeVariantSwitcher;
