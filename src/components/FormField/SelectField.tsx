import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';


export interface SelectOption {
   label?: string;
   value: number | string;
}

export interface SelectFieldProps<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
   > extends InputHTMLAttributes<HTMLInputElement> {
   name: TName;
   control: Control<TFieldValues>;
   label?: string;
   disabled?: boolean;
   options: SelectOption[];
}

export function SelectField<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, label, disabled, options }: SelectFieldProps<TFieldValues, TName>) {
   const {
      field: { value, onChange, onBlur },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   });

   return (

      <FormControl
         fullWidth
         variant="outlined"
         margin="normal"
         size="small"
         disabled={disabled}
         error={invalid}
      >
         <InputLabel id={`${name}_label`}>{label}</InputLabel>
         <Select
            labelId={`${name}_label`}
            value={value}
            onChange={(e) => {
               onChange(e.target.value)
            }}
            onBlur={onBlur}
            label={label}
         >
            {options.map((option) => (
               <MenuItem key={option.value} value={option.value}>
                  {option.label}
               </MenuItem>
            ))}
         </Select>

         <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
   );
}
