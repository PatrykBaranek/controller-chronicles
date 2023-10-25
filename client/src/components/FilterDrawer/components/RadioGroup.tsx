import {
	FormControlLabel,
	Radio as RadioComponent,
	RadioGroup as RadioGroupComponent,
} from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import styled from 'styled-components';

type Props = {
	options: Value[];
	size: 'medium' | 'small';
	name: string;
	control: Control<any>;
};

type Value = {
	label: string;
	value: any;
};

const StyledRadioGroup = styled(RadioGroupComponent)`
	flex-direction: row !important;
	gap: 2rem;
	justify-content: center;
	color: ${({ theme }) => theme.colors.primary};
	margin-top: -1.5rem;
`;
const StyledFormLabel = styled(FormControlLabel)`
	.MuiTypography-root {
		font-family: inherit !important;
		font-weight: ${({ theme }) => theme.fontWeights.semiBold};
		font-size: 0.9rem;
	}
	.MuiRadio-colorPrimary {
		color: ${({ theme }) => theme.colors.primary};
	}
`;

const RadioGroup = ({ options, size = 'medium', name, control }: Props) => {
	return (
		<Controller
			control={control}
			name={name}
			defaultValue=''
			render={({ field }) => (
				<StyledRadioGroup {...field}>
					{options.map(({ value, label }) => (
						<StyledFormLabel
							key={label}
							value={value}
							control={<RadioComponent size={size} />}
							label={label}
						/>
					))}
				</StyledRadioGroup>
			)}
		/>
	);
};

export default RadioGroup;
