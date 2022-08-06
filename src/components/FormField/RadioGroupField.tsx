import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';


export interface RadioOption {
   label?: string;
   value: number | string;
}

export interface RadioGroupFieldProps<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
   > extends InputHTMLAttributes<HTMLInputElement> {
   name: TName;
   control: Control<TFieldValues>;
   label?: string;
   disabled?: boolean;
   options: RadioOption[];
   isRow?: boolean | undefined
}

export function RadioGroupField<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, label, disabled, options, isRow }: RadioGroupFieldProps<TFieldValues, TName>) {
   const {
      field: { value, onChange, onBlur },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   });
   return (
      <FormControl>
         <FormLabel component='legend'></FormLabel>

         <RadioGroup name={name} value={value || ''}
            onChange={onChange} onBlur={onBlur}
            row={isRow}
         >
            {options.map((option) => (
               <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
               />
            ))}
         </RadioGroup>
         <FormHelperText>{error?.message}</FormHelperText>

      </FormControl>
   );
}
