import { HLTB } from '#/types/types';
import { styled } from 'styled-components';

export const StyledGameplayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  h2 {
    grid-column: span 4 / span 4;
    margin-bottom: 0.5rem;
    @media screen and (min-width: 500px) {
      grid-column: span 3 / span 3;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  p {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.light};
    font-size: clamp(0.85rem, 2.5vw, 1rem);
    margin-bottom: 0.5rem;
    text-align: center;
  }
  span {
    color: ${({ theme }) => theme.colors.yellow};
  }
  .main,
  .sides {
    grid-column: span 2 / span 2;
    span + span {
      margin-top: 0.5rem;
    }
    @media screen and (min-width: 500px) {
      grid-column: unset;
    }
  }
  .full {
    grid-row-start: 3;
    grid-column: span 4 / span 4;
    span + span {
      margin-top: 0.5rem;
    }
    @media screen and (min-width: 500px) {
      grid-row-start: unset;
      grid-column: unset;
    }
  }
`;

function Gameplay({ hltbData }: { hltbData: HLTB | undefined }) {
  return (
    <StyledGameplayWrapper>
      <h2>Gameplay</h2>
      <div className='main'>
        <p>Main gameplay</p>
        <span>{hltbData?.gameplayMain || '- '}h</span>
      </div>
      <div className='sides'>
        <p>Main gameplay + sides</p>
        <span>{hltbData?.gameplayMainExtra || '- '}h</span>
      </div>
      <div className='full'>
        <p>100%</p>
        <span>{hltbData?.gameplayCompletionist || '- '}h</span>
      </div>
    </StyledGameplayWrapper>
  );
}

export default Gameplay;
