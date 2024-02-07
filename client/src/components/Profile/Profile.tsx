import { deleteUserAccount, getUserProfile, requestPasswordChange } from '#/api/gamesApi';
import { StyledButton } from '#/pages/Login';
import getAuthToken from '#/utils/getAuthToken';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import ConfirmationModal from '../UI/ConfirmationModal';
import { toast } from 'sonner';
import errorIco from '#/assets/errorIco.svg';
import successIco from '#/assets/successIco.svg';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

type ButtonProps = {
  isDelete: boolean;
};

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: clamp(1.625rem, 5vw, 3.25rem);
  @media screen and (min-width: 900px) {
    width: 40vw;
    overflow: hidden;
    position: relative;
    padding: 1px;
    transition: all 0.2s ease-in-out;
    padding-block: 3rem;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      padding: 1px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.2) 30%,
        rgba(255, 255, 255, 0) 100%
      );
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
    &::after {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      height: 100%;
      width: 100%;
      opacity: 1;
      pointer-events: none;
      opacity: 0.15;
      background: linear-gradient(180deg, #48319d 0%, #48319d7d 30%, rgba(255, 255, 255, 0) 100%);
    }
  }
  @media screen and (min-width: 1200px) {
    width: 50%;
    justify-content: unset;
    align-items: unset;
    margin-top: 2rem;
    height: 80%;
  }
`;
const StyledProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;
const StyledFormButton = styled(StyledButton)<ButtonProps>`
  font-size: 15px;
  width: 60%;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme, isDelete }) => isDelete && theme.colors.red};
`;

export const StyledAvatar = styled.span`
  width: clamp(130px, 10vw, 160px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 100vh;
  background: ${({ theme }) => theme.colors.secondaryGradient};
  font-size: 3rem;
`;

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const authToken = getAuthToken();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const { data } = useQuery(['user'], () => getUserProfile(authToken), {
    onSuccess: (data) => setUserName(data.email.split('@')[0]),
  });

  const changePassword = useMutation({
    mutationFn: () => requestPasswordChange(data?.email!),
    onSuccess: () => {
      toast('Success', {
        className: 'default',
        description: `Link has been sent to your email`,
        duration: 5000,
        icon: <img src={successIco} />,
        position: 'top-right',
      });
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

  const removeUser = useMutation({
    mutationFn: () => deleteUserAccount(authToken, data?.id!),
    onSuccess: () => {
      signOut();
      navigate('/');
      toast('Success', {
        className: 'default',
        description: `Account successfully removed`,
        duration: 5000,
        icon: <img src={successIco} />,
        position: 'top-right',
      });
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

  return (
    <StyledContainer>
      <StyledProfileInfo>
        <StyledAvatar>{userName[0]?.toUpperCase()}</StyledAvatar>
        <h3>{userName}</h3>
      </StyledProfileInfo>
      <StyledForm>
        <StyledFormButton
          isDelete={false}
          onClick={(e) => {
            e.preventDefault();
            changePassword.mutate();
          }}
        >
          Change your password
        </StyledFormButton>
        <StyledFormButton
          onClick={(e) => {
            e.preventDefault();
            setIsDialogOpen(true);
          }}
          isDelete
        >
          Delete account
        </StyledFormButton>
      </StyledForm>
      {isDialogOpen && (
        <ConfirmationModal
          isOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen(false)}
          buttonText='Delete account'
          confirmCallback={() => removeUser.mutate()}
          heading='Are you sure you want to delete your account?'
          contentText='This change will be irreversible'
        />
      )}
    </StyledContainer>
  );
};

export default Profile;
