import { getEpisodeById } from '#/api/gamesApi';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';
import { StyledAddButton, StyledDialog } from '../UI/ConfirmationModal';
import { Link } from 'react-router';

type Props = {
  handleClose: () => void;
  isOpen: boolean;
  contentText?: string;
  heading?: string;
  id: string;
};

function EpisodeDetailsModal({ handleClose, isOpen, contentText, heading, id }: Props) {
  const { data: episode } = useQuery({
    queryKey: ['/episode/:id', id],
    queryFn: () => getEpisodeById(id),
  });

  const formatHtmlDescription = (description: string) => {
    return description
      ?.split('<br/>')
      .filter((item) => item !== '<p><br /></p>')
      .join('');
  };

  return (
    <div>
      <StyledDialog
        sx={{
          '.MuiDialog-paper': {
            borderRadius: 0,
          },

          '.MuiDialogContent-root': {
            justifyContent: 'unset !important',
          },
        }}
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth='xl'
        fullScreen
      >
        <DialogTitle>{episode?.show?.name}</DialogTitle>
        <DialogContent>
          <StyledDialogContentText>
            <img src={episode?.images[1]?.url} alt={`${episode?.name} image`} />
            <span className='block'>
              <span className='title'>{episode?.name}</span>
              <span className='min-[900px]:justify-[unset] flex justify-between gap-4'>
                <p>Episode duration: {dayjs(episode?.duration_ms).format('HH:mm:ss')}</p>
                <p>Release date: {dayjs(episode?.release_date).format('DD-MM-YYYY')}</p>
              </span>
              {episode?.html_description ? (
                <span
                  className='description'
                  dangerouslySetInnerHTML={{
                    __html: formatHtmlDescription(episode?.html_description),
                  }}
                ></span>
              ) : (
                <span className='description'>{episode?.description}</span>
              )}
            </span>
          </StyledDialogContentText>
        </DialogContent>
        <DialogActions className='flex-wrap justify-center min-[400px]:flex-row-reverse min-[400px]:flex-nowrap min-[400px]:justify-between'>
          <StyledAddButton>
            <Link
              className='text-inherit'
              to={episode?.show?.external_urls?.spotify || ''}
              target='_blank'
            >
              Check other episodes on spotify
            </Link>
          </StyledAddButton>
          <StyledAddButton onClick={handleClose}>Close</StyledAddButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}

const StyledDialogContentText = styled(DialogContentText)`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1050px) {
    flex-direction: row;
    gap: 2rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    margin-block: 1rem;

    @media screen and (min-width: 1050px) {
      text-align: left;
    }
  }

  img {
    width: 60vw;
    border-radius: 1rem;
    margin-inline: auto;
    align-self: flex-start;

    @media screen and (min-width: 900px) {
      width: 40vw;
    }

    @media screen and (min-width: 1050px) {
      margin-inline: unset;
      width: 30vw;
    }

    @media screen and (min-width: 1380px) {
      width: 30vw;
    }
  }
  .description {
    p {
      margin-bottom: 1rem;
      text-align: center;
      word-wrap: break-word;
      @media screen and (min-width: 900px) {
        text-align: left;
      }
    }

    a {
      display: block;
      color: inherit;
      margin-bottom: 0.2rem;
      width: fit-content;
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default EpisodeDetailsModal;
