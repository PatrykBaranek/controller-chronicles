import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import styled from 'styled-components';

type StyledProps = {
  isActive: boolean;
};

type Props = StyledProps & {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  image: string;
  name: string;
};

const StyledPaginationDot = styled.div<StyledProps>`
  height: 10px;
  width: 10px;
  background-color: ${({ isActive }) => (isActive ? 'steelblue' : '#f5f5f5')};
  border-radius: 50%;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
`;

const StyledPaginationItem = styled.div<StyledProps>`
  background: ${({ isActive, theme }) =>
    isActive
      ? theme.colors.secondaryGradient
      : 'linear-gradient(131.88deg, #a63ee72f 14.48%, #00eaff2b 83.43%)'};
  cursor: pointer;
  width: 100%;
  display: flex;
  padding: 0.7rem 1rem;
  border-radius: 0.7rem;
  gap: 10px;

  @media screen and (min-width: 1500px) {
    padding: 0.5rem 1rem;
  }
`;

const StyledImageWrapper = styled.div`
  width: 30%;
  display: flex;
  img {
    width: 100%;
  }
`;
const StyledTitleWrapper = styled.div<StyledProps>`
  width: 70%;
  display: flex;
  align-items: center;
  text-align: center;
  p {
    color: ${({ isActive, theme }) =>
      isActive ? '#fff' : theme.colors.primary};
  }
`;
const CarouselPagination = ({ name, image, isActive, onClick }: Props) => {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);

  return (
    <>
      {!isDesktop ? (
        <StyledPaginationDot
          isActive={isActive}
          onClick={onClick}
        ></StyledPaginationDot>
      ) : (
        <StyledPaginationItem
          isActive={isActive}
          onClick={onClick}
        >
          <StyledImageWrapper>
            <img
              src={image}
              alt={`${name} image`}
            />
          </StyledImageWrapper>
          <StyledTitleWrapper isActive={isActive}>
            <p>{name}</p>
          </StyledTitleWrapper>
        </StyledPaginationItem>
      )}
    </>
  );
};

export default CarouselPagination;
