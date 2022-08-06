import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';
import { InputHTMLAttributes, useState } from 'react';
import { Control, FieldPath, FieldValues, PathValue, useController } from 'react-hook-form';

export interface CheckBoxOption {
  label?: string;
  value: string;
}

export interface CheckBoxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  > extends InputHTMLAttributes<HTMLInputElement> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  disabled?: boolean;
  options: CheckBoxOption[];
  isRow?: boolean | undefined
}

export function CheckBoxField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, label, disabled, options, isRow }: CheckBoxFieldProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, onBlur, },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  const [valueState, setValueState] = useState<
    string[]
  >((value) as string[]);
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Checkbox onChange={
              (e) => {
                const valueCopy: string[] = [...valueState];
                valueCopy[index] = e.target.checked ? e.target.value : '';
                onChange(valueCopy)
                setValueState(valueCopy);
              }
            }
              checked={valueState.includes(option.value)}
            />}
            label={option.label}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}

{/* <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </Box> */}
