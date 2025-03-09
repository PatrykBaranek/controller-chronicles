import { addPodcastToCollection, getUserPodcasts } from '../../api/gamesApi';
import errorIco from '../../assets/errorIco.svg';
import heartIcon from '../../assets/heartIcon.svg';
import successIco from '../../assets/successIco.svg';
import { Podcast, UserPodcasts } from '../../types/types';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import styled from 'styled-components';
import ConfirmationModal from '../UI/ConfirmationModal';

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-align: left;
  width: 100%;
  @media screen and (min-width: 900px) {
    margin-bottom: 0;
    margin-left: 0;
    gap: 1.5rem;
  }
  .title {
    font-size: clamp(1.5rem, 5vw, 2.8rem);
  }
  .publisher {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    color: ${({ theme }) => theme.colors.primary};
  }
  .tagWrapper {
    display: flex;
    gap: 1rem;
  }
`;

const StyledLanguagesWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledTag = styled.span`
  width: fit-content;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: 0.8rem;
  padding: 0.2rem 0.3rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  text-transform: capitalize;
  @media screen and (min-width: 900px) {
    padding: 0.4rem 0.5rem;
    border-radius: 15px;
  }

  &.podcastType {
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.white};
  }
`;

const StyledButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 900px) {
    justify-content: start;
    gap: 5rem;
  }
  .link {
    font-size: clamp(0.8rem, 3vw, 1rem);
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.inputGradient};
    padding: 1rem 2rem;
    border-radius: 100vw;
    transition: all 0.2s ease-in-out;
    &:hover {
      filter: contrast(5);
    }
  }
  .addToCollection {
    background: ${({ theme }) => theme.colors.inputGradient};
    border: none;
    padding: 1.5rem;
    border-radius: 100vw;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      filter: contrast(5);
    }
    &:disabled {
      pointer-events: none;
      background: ${({ theme }) => theme.colors.secondary};
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition-delay: 0.2;
    }
  }
`;

const StyledDescription = styled.div`
  width: 100%;
  word-wrap: break-word;
  h2 {
    font-size: clamp(1.5rem, 5vw, 2.8rem);
    margin-bottom: 0.5rem;
  }
  p {
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.1;
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }
`;

const MainInfo = ({ podcast }: { podcast?: Podcast }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPodcastInCollection, setIsPodcastInCollection] = useState(false);

  const addToCollection = useMutation({
    mutationFn: () => addPodcastToCollection(podcast?.id!),
    onSuccess: () => {
      toast('Success', {
        className: 'default',
        description: `${podcast?.name} successfully added to collection`,
        duration: 5000,
        icon: <img src={successIco} />,
        position: 'top-right',
      });
      refetch();
    },
    onError: (error: any) => {
      toast('Error', {
        className: 'default',
        description: error?.response?.data?.message,
        duration: 5000,
        icon: <img src={errorIco} />,
        position: 'top-right',
      });
    },
  });

  const { data, refetch } = useQuery(['spotify/podcasts/list'], () => getUserPodcasts(), {
    onSuccess: (data: UserPodcasts) =>
      setIsPodcastInCollection(data.items.some(({ show }) => show.id === podcast?.id)),
  });

  return (
    <>
      <StyledTitleWrapper>
        <h1 className='title'>{podcast?.name}</h1>
        <div className='tagWrapper'>
          <StyledTag className='podcastType'>{podcast?.media_type}</StyledTag>
          <StyledTag className='podcastType'>{podcast?.type}</StyledTag>
        </div>
        <p className='publisher'>{podcast?.publisher}</p>

        <StyledLanguagesWrapper>
          <p>Languages</p>
          {podcast?.languages.slice(0, 4).map((language) => (
            <StyledTag key={language}>{language}</StyledTag>
          ))}
        </StyledLanguagesWrapper>
        <StyledDescription>
          <h2>Description</h2>
          <p>{podcast?.description}</p>
        </StyledDescription>

        <StyledButtonsWrapper>
          <Link className='link' target='_blank' to={podcast?.external_urls?.spotify || ''}>
            Check on Spotify
          </Link>
          <Tooltip
            title={isPodcastInCollection ? 'Podcast already in collection' : 'Add to collection'}
            arrow
          >
            <span>
              <button
                disabled={isPodcastInCollection}
                className='addToCollection'
                onClick={() => setIsDialogOpen(true)}
              >
                <img src={heartIcon} alt='add to collection' />
              </button>
            </span>
          </Tooltip>
        </StyledButtonsWrapper>
      </StyledTitleWrapper>
      {isDialogOpen && (
        <ConfirmationModal
          heading={`Add ${podcast?.name} to collection?`}
          isOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen((prev) => !prev)}
          confirmCallback={() => addToCollection.mutate()}
          buttonText='Add'
          contentText=''
        />
      )}
    </>
  );
};

export default MainInfo;
