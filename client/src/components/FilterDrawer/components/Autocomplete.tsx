import { Autocomplete as AutocompleteComponent, TextField } from '@mui/material';
import { type Control, Controller } from 'react-hook-form';
import { styled } from 'styled-components';

export type Option = {
  id: string | number;
  name: string;
};
type Props = {
  options: Option[];
  label: string;
  control: Control<any>;
  multiple?: boolean;
  filterSelectedOptions?: boolean;
};

const StyledAutocompleteWrapper = styled(Controller)`
  .MuiAutocomplete-popper > * {
    background: linear-gradient(90deg, #223682 0%, #547c95 100%);
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.secondary};
    font-family: inherit;
  }
  @media screen and (min-width: 900px) {
    ul {
      scroll-behavior: smooth;
      scrollbar-color: rgba(255, 255, 255, 0.2)
        linear-gradient(180deg, rgba(60, 112, 85, 0.6) 12.85%, rgba(60, 112, 85, 0.35) 61.83%);
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: linear-gradient(
          180deg,
          rgba(60, 112, 85, 0.6) 12.85%,
          rgba(60, 112, 85, 0.8) 61.83%
        );
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
      }
    }
  }
`;

const StyledAutocomplete = styled(AutocompleteComponent)`
  background: linear-gradient(135deg, #0f54e860 0%, #9ddff360 100%);
  border: none;
  border-radius: 10px;
  &.css-1h51icj-MuiAutocomplete-root .MuiOutlinedInput-root {
    padding: 0;
  }
  .MuiAutocomplete-popper > * {
    background: linear-gradient(135deg, #0f54e82d 0%, #9ddff33b 100%);
    border-radius: 10px;
  }
  input {
    padding-left: 0.6rem !important;
    color: ${({ theme }) => theme.colors.secondary};
  }
  .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root,
  .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: ${({ theme }) => theme.colors.secondary};
  }
  .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
    transform: translate(14px, 8px) scale(1);
    color: ${({ theme }) => theme.colors.secondary};
    font-family: inherit;
  }
  fieldset {
    display: none;
  }
`;
const Autocomplete = ({ options, label, control, multiple, filterSelectedOptions }: Props) => {
  return (
    <StyledAutocompleteWrapper
      control={control}
      name={label}
      defaultValue={null}
      render={({ field: { ref, onChange, ...field } }) => (
        <StyledAutocomplete
          multiple={multiple}
          filterSelectedOptions={filterSelectedOptions}
          options={options}
          disablePortal={true}
          getOptionLabel={(option: any) => option.name}
          onChange={(_, value) => onChange(value)}
          renderInput={(params) => (
            <TextField inputRef={ref} {...params} {...field} label={label} />
          )}
        />
      )}
    ></StyledAutocompleteWrapper>
  );
};

export default Autocomplete;
