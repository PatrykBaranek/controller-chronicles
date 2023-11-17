import styled from 'styled-components';
import { default as ProfileComponent } from '#/components/Profile/Profile';
import Collections from '#/components/Collections/Collections';
const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 1rem;
  gap: 5rem;
  margin-top: 2rem;
  @media screen and (min-width: 900px) {
    align-items: center;
    gap: 3.5rem;
    padding-inline: 2rem;
  }
  @media screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: unset;
  }
`;

const Profile = () => {
  return (
    <StyledContainer>
      <ProfileComponent />
      <Collections />
    </StyledContainer>
  );
};

export default Profile;
