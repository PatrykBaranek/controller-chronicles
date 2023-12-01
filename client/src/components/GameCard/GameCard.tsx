import { Gamecard } from '#/types/types';
import styled from 'styled-components';
import Card from '../UI/Card';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getGameById } from '#/api/gamesApi';
import { Skeleton } from '@mui/material';

const StyledImage = styled.div`
  width: 100%;
  height: 50%;
  img {
    border-radius: 1rem 1rem 0 0;
    width: 100%;
    height: 100%;
  }
`;
const StyledContent = styled.div`
  width: 100%;
  height: 50%;
  padding-inline: 1rem;
  padding-top: 1.2rem;
`;
const StyledTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    width: 100%;
    color: white;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: clamp(0.8rem, 2vw, 1rem);
    @media screen and (min-width: 900px) {
      font-size: clamp(0.7rem, 1vw, 1rem);
    }
  }
  p {
    width: 100%;
    text-align: right;
    font-size: clamp(0.8rem, 2vw, 1rem);
    color: ${({ theme }) => theme.colors.primary};
    @media screen and (min-width: 900px) {
      font-size: clamp(0.7rem, 1vw, 1rem);
    }
    span {
      display: inline-block;
      margin-top: 5px;
      color: ${({ theme }) => theme.colors.yellow};
    }
  }
`;
const StyledDescription = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-block: 0.3rem;
  line-height: 1.1;
  p {
    font-size: 0.8rem;
  }
`;

const GameCard = ({ id, image, title, rating }: Gamecard) => {
  const { data, isError, isLoading } = useQuery(['gameCard', id], () => getGameById(id));
  const description = data && data.rawgGame.description_raw;

  return (
    <Card>
      <Link to={`${id}`}>
        <StyledImage>
          <img src={image} alt={`${title} image`} />
        </StyledImage>

        <StyledContent>
          <StyledTopSection>
            <h1>{title}</h1>
            <p>
              Rating <span>{rating ? rating : 0}/10</span>
            </p>
          </StyledTopSection>
          <StyledDescription>
            {!isError ? (
              isLoading ? (
                <Skeleton
                  sx={{
                    backgroundImage:
                      'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
                    borderRadius: '1rem ',
                  }}
                  animation='wave'
                  variant='rounded'
                  height={'100px'}
                  width={'100%'}
                >
                  <p>{description && description.slice(0, 250) + ' ...'}</p>
                </Skeleton>
              ) : (
                <p>{description && description.slice(0, 250) + ' ...'}</p>
              )
            ) : (
              <p>Something went wrong!</p>
            )}
          </StyledDescription>
        </StyledContent>
      </Link>
    </Card>
  );
};

export default GameCard;
