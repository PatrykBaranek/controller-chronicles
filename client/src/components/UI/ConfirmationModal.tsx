import { StyledButton } from '#/pages/Login';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';

type Props = {
  handleClose: () => void;
  isOpen: boolean;
  buttonText: string;
  contentText: string;
  heading: string;
  confirmCallback: () => void;
};

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: ${({ theme }) => theme.colors.mainGradient};
    border-radius: 10px;
    filter: brightness(1.2);
    & > * {
      color: ${({ theme }) => theme.colors.secondary};
      font-family: inherit;
    }
  }
  .MuiDialogContent-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    input {
      font-family: inherit;
      font-weight: ${({ theme }) => theme.fontWeights.semiBold};
      outline-color: ${({ theme }) => theme.colors.primary};
    }
  }
  .MuiDialogContentText-root {
    color: ${({ theme }) => theme.colors.secondary};
    font-family: inherit;
    margin-bottom: 0.5rem;
  }
  .MuiDialogActions-root {
    justify-content: space-between;
    padding-inline: clamp(0.7rem, 2vw, 1.5rem);
  }
`;

export const StyledAddButton = styled(StyledButton)`
  width: unset;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const ConfirmationModal = ({
  handleClose,
  isOpen,
  buttonText,
  contentText,
  heading,
  confirmCallback,
}: Props) => {
  return (
    <div>
      <StyledDialog open={isOpen} onClose={handleClose} fullWidth>
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledAddButton onClick={handleClose}>Close</StyledAddButton>
          <StyledAddButton
            onClick={() => {
              confirmCallback();
              handleClose();
            }}
          >
            {buttonText}
          </StyledAddButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default ConfirmationModal;
