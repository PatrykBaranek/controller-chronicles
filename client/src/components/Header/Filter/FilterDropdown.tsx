import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const StyledSelect = styled(Select)`
  border-radius: 2rem !important;
  padding: 0.35rem 1rem;
  border: 1px solid #ffffff34;
  background: linear-gradient(
    135deg,
    rgba(15, 85, 232, 0.2) 0%,
    rgba(157, 223, 243, 0.2) 100%
  );
  color: ${({ theme }) => theme.colors.primary} !important;
  font-weight: ${({ theme }) => theme.fontWeights.medium} !important;
  svg {
    color: ${({ theme }) => theme.colors.primary} !important;
  }
  fieldset {
    display: none;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }
`;

const theme = createTheme({
  typography: {
    fontFamily: 'Inter',
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          background: `linear-gradient(
            135deg,
            rgba(15, 85, 232, 0.5) 0%,
            rgba(157, 223, 243, 1) 100%
          )`,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingBlock: 0,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            background: `linear-gradient(234.73deg, #3c705563 12.85%, #22173849 61.83%)`,
            '&.Mui-focusVisible': {
              background: `linear-gradient(234.73deg, #3c705563 12.85%, #22173849 61.83%)`,
            },
          },
        },
      },
    },
  },
});

const FilterDropdown = ({ categories }: { categories: Array<any> }) => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedCategory(event.target.value as string);
  };
  useEffect(() => {
    id && setSelectedCategory(id);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <StyledSelect
        defaultValue='all'
        value={selectedCategory}
        onChange={handleChange}
      >
        {categories.map((category, idx) => (
          <MenuItem
            key={idx}
            value={category}
          >
            <NavLink to={`/games/${category === 'all' ? '' : category}`}>
              {category}
            </NavLink>
          </MenuItem>
        ))}
      </StyledSelect>
    </ThemeProvider>
  );
};

export default FilterDropdown;
