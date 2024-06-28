import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField ,FormControlLabel,MenuItem} from '@mui/material';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
 children: PropTypes.node,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultValue: PropTypes.any,
};

// RHFSelect.defaultProps = {
//   options: [], // Provide a default empty array for options
//   defaultValue: '', // Provide a default value
// };

export default function RHFSelect({ name,children  ,defaultValue ,options = [], ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} // Set the default value here
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
          </option>
          ))}
        </TextField>
      )}
    />
  );
}
