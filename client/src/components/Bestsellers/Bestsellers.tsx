import { getBestsellers } from '#/api/gamesApi';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import BestsellersItem from './BestsellersItem';
import { Skeleton } from '@mui/material';

const StyledBestsellers = styled.div`
  padding-inline: 1rem;
  margin-top: 8vw;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  @media screen and (min-width: 900px) {
    text-align: left;
    margin-top: 5vw;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    margin-bottom: 1rem;
  }
`;
const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Bestsellers = () => {
  const { data, isLoading } = useQuery(['bestsellers'], () => getBestsellers());
  const bestsellers = data?.slice(0, 4);
  console.log(bestsellers);
  return (
    <StyledBestsellers>
      <h3>Bestsellers</h3>
      <StyledWrapper>
        {isLoading
          ? Array(4)
              .fill('')
              .map(() => (
                <Skeleton
                  sx={{
                    backgroundImage:
                      'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
                    borderRadius: '1rem ',
                  }}
                  animation='wave'
                  variant='rounded'
                  height={'200px'}
                  width={'100%'}
                />
              ))
          : bestsellers?.map(bestseller => (
              <BestsellersItem
                key={bestseller.link}
                img={bestseller.img}
                price={bestseller.price}
                name={bestseller.name}
                link={bestseller.link}
              />
            ))}
      </StyledWrapper>
    </StyledBestsellers>
  );
};

export default Bestsellers;
