import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { type Control, Controller } from 'react-hook-form';
import { styled } from 'styled-components';

type Props = {
  label: string;
  control: Control<any>;
};

const StyledCalendar = styled(DatePicker)`
  background: linear-gradient(135deg, #0f54e82d 0%, #9ddff33b 100%);
  border-radius: 10px;
  & > * {
    color: ${({ theme }) => theme.colors.secondary} !important;
    font-family: inherit !important;
  }
  fieldset {
    border: none;
  }
`;

const Datepicker = ({ label, control }: Props) => {
  return (
    <Controller
      name={label}
      control={control}
      render={({ field: { onChange, ...rest } }) => (
        <StyledCalendar
          slotProps={{
            toolbar: { hidden: true },
          }}
          format='DD-MM-YYYY'
          desktopModeMediaQuery='@media screen and (min-width:900px)'
          onChange={(e) => onChange(e)}
          label={label}
          {...rest}
        />
      )}
    />
  );
};

export default Datepicker;
