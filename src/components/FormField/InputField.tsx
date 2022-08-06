import { TextField } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

export interface InputFieldProps<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
   > extends InputHTMLAttributes<HTMLInputElement> {
   name: TName;
   control: Control<TFieldValues>;
   label?: string
}

export function InputField<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, label, ...inputProps }: InputFieldProps<TFieldValues, TName>) {
   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   });

   return (
      <TextField
         fullWidth
         size="small"
         margin="normal"
         value={value || ''}
         onChange={onChange}
         onBlur={onBlur}
         label={label}
         variant="outlined"
         inputRef={ref}
         error={invalid}
         helperText={error?.message}
         inputProps={inputProps}
      />
   );
}
