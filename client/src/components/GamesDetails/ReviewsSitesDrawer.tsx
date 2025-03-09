import { ReviewsSites } from '../../types/types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type DrawerProps = {
  isOpen: boolean;
};

const StyledDrawer = styled.form<DrawerProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100svh;
  padding: 2rem;
  gap: 2.5rem;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '200%')});
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: transform 0.6s ease-in-out, opacity 0.5s ease-in-out 0.2s;
  background: linear-gradient(
      234.73deg,
      rgba(60, 112, 85, 0.5) 12.85%,
      rgba(34, 23, 56, 0.8) 61.83%
    ),
    rgba(34, 20, 117, 0.4);
  backdrop-filter: blur(10px);
  @media screen and (min-width: 900px) {
    width: 50%;
    transform: translateX(${({ isOpen }) => (isOpen ? '100%' : '300%')});
    box-shadow: 1px 0px 10px 3px rgba(0, 0, 0, 0.253);
  }
  @media screen and (min-width: 1300px) {
    transform: translateX(${({ isOpen }) => (isOpen ? '235%' : '400%')});
    width: 30vw;
  }
`;

const StyledButton = styled.button`
  width: fit-content;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  border: none;
  background: #00eaffae;
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px;
`;

const StyledSiteWrapper = styled.div`
  position: relative;
  font-size: 0.9rem;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
  }

  a {
    display: block;
    color: ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease-in-out;
    padding: 0.5rem;
    &:hover {
      color: ${({ theme }) => theme.colors.yellow};
    }
  }
`;

const ReviewsSitesDrawer = ({
  isOpen,
  setIsDrawerOpen,
  reviewSites,
}: {
  isOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reviewSites?: ReviewsSites;
}) => {
  return (
    <StyledDrawer isOpen={isOpen}>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          setIsDrawerOpen(false);
        }}
      >
        Back
      </StyledButton>
      {reviewSites?.map((site) => (
        <StyledSiteWrapper key={site.url}>
          <Link to={site.url} target='_blank'>
            {site.title}
          </Link>
        </StyledSiteWrapper>
      ))}
    </StyledDrawer>
  );
};

export default ReviewsSitesDrawer;
