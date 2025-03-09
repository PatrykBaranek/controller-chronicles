import useStore from '../../store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { platforms, sortingOptions, stores } from './Filters.mock';
import Autocomplete, { Option } from './components/Autocomplete';
import Datepicker from './components/Datepicker';
import RadioGroup from './components/RadioGroup';
import { type Dayjs } from 'dayjs';
import { formatDate, formatParams } from './FilterDrawer.utils';
import { useQuery } from 'react-query';
import { getFilteredGames } from '../../api/gamesApi';
import { useEffect, useState } from 'react';

type ButtonProps = {
  $action?: boolean;
};

type DrawerProps = {
  isOpen: boolean;
};

export type FormValues = {
  Platforms?: Option;
  Stores?: Option;
  Sort?: Option;
  Order?: {
    label: string;
    value: string;
  };
  From?: Dayjs;
  To?: Dayjs;
};

const StyledDrawer = styled.form<DrawerProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100vh;
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

  .MuiAutocomplete-popper > * {
    background: linear-gradient(90deg, #223682 0%, #547c95 100%);
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.secondary};
    font-family: inherit;
  }
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;
const StyledButton = styled.button<ButtonProps>`
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  border: none;
  background: ${({ $action }) => ($action ? '#a63ee7ae' : '#00eaffae')};
  color: ${({ $action, theme }) => ($action ? theme.colors.white : '#000')};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px;
`;
const StyledDateWrapper = styled.div`
  p {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.secondary};
    text-align: center;
  }
  div {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

const radioOptions = [
  { label: 'ASC', value: '' },
  { label: 'DESC', value: '-' },
];

const FilterDrawer = () => {
  const { isFiltersOpen, toggleFiltersOpen, storeGames } = useStore();
  const { control, handleSubmit, watch } = useForm<FormValues>();
  const isSorted = watch('Sort');
  const [query, setQuery] = useState('');
  const { data, refetch } = useQuery(['/games', query], () => getFilteredGames(query), {
    enabled: false,
  });

  const onSubmit: SubmitHandler<FormValues> = ({ Platforms, Stores, Sort, Order, From, To }) => {
    const paramObj = {
      platforms: Platforms?.name,
      stores: Stores?.name,
      sort: Sort?.name,
      dates: formatDate(From, To),
      order: Order?.value,
    };
    if (!Object.keys(formatParams(paramObj)).length) {
      toggleFiltersOpen();
      return;
    }
    const params = new URLSearchParams(formatParams(paramObj)).toString();
    setQuery(params);
    toggleFiltersOpen();
  };

  useEffect(() => {
    if (query.length > 1) {
      refetch();
      data && storeGames(data?.results);
    }
  }, [data, query]);

  const onBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toggleFiltersOpen();
  };

  return (
    <StyledDrawer isOpen={isFiltersOpen} onSubmit={handleSubmit(onSubmit)}>
      <StyledButtonWrapper>
        <StyledButton onClick={onBack}>Back</StyledButton>
        <StyledButton type='submit' $action>
          Filter
        </StyledButton>
      </StyledButtonWrapper>
      <Autocomplete control={control} options={platforms} label='Platforms' />
      <Autocomplete control={control} options={stores} label='Stores' />
      <Autocomplete control={control} options={sortingOptions} label='Sort' />
      {isSorted && (
        <RadioGroup control={control} options={radioOptions} size='small' name='Order' />
      )}
      <StyledDateWrapper>
        <p>Release date</p>
        <div>
          <Datepicker control={control} label='From' />
          <Datepicker control={control} label='To' />
        </div>
      </StyledDateWrapper>
    </StyledDrawer>
  );
};

export default FilterDrawer;
