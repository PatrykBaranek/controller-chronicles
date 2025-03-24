import useWindowWidth from '#/hooks/useWindowWidth';
import leaveIcon from '#/assets/leaveIcon.svg';
import { Link } from 'react-router';
import CollectionsDesktop from './CollectionsDesktop';
import CollectionsMobile from './CollectionsMobile';
import { styled } from 'styled-components';
import type { CollectionResponse } from '#/types/types';
import CollectionsButton from './CollectionsButton';

const StyledCardContainer = styled.div`
  width: 100%;
  display: flex;
  @media screen and (min-width: 1200px) {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  .splide__arrow {
    background: #00eaff6f;
  }
  .splide__pagination {
    @media screen and (min-width: 600px) {
      bottom: unset;
    }
  }
`;
const StyledCollectionTitle = styled(Link)`
  display: flex;
  height: 1.1rem;
  gap: 0.5rem;
  margin-bottom: 1rem;
  h3 {
    font-size: 1.1rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 1px;
  transition: all 0.2s ease-in-out;
  padding-top: 1rem;
  padding-bottom: 1rem;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    padding: 1px;
    background: linear-gradient(
      360deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.2) 30%,
      rgba(255, 255, 255, 0) 70%
    );
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    content: '';
    transform: rotate(180deg) translateX(50%);
    height: 50%;
    width: 100%;
    opacity: 0.5;
    pointer-events: none;
    background: ${({ theme }) => theme.colors.activeGradient};
  }
`;

const CollectionList = ({ collections }: { collections: CollectionResponse[] }) => {
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth && windowWidth >= 1200;

  return (
    <>
      {collections?.slice(0, 3).map(({ _id, name, games }, idx) => (
        <div key={_id + idx}>
          <StyledCollectionTitle to={`collections/${_id}`}>
            <h3>{name}</h3>
            <img src={leaveIcon} alt='Leave icon' />
          </StyledCollectionTitle>
          <StyledCardContainer>
            {!isDesktop ? (
              <CollectionsMobile games={games} />
            ) : (
              <CollectionsDesktop
                games={games.slice(0, 6)}
                length={games.length > 6 ? 6 : games.length}
              />
            )}
          </StyledCardContainer>
        </div>
      ))}
      {collections && collections.length > 3 && (
        <StyledButtonContainer>
          <CollectionsButton text='See more collections' />
        </StyledButtonContainer>
      )}
    </>
  );
};

export default CollectionList;
