import { Alert, Box, Button, CircularProgress, useControlled } from "@mui/material";
import { useEffect, useState } from "react";
import { Control, useController, useForm, UseFormProps, useWatch } from "react-hook-form";
import { useAppSelector } from "../../../app/hooks";
import { CheckBoxField, InputField, RadioGroupField, SelectField } from "../../../components/FormField";
import { selectCityOptions } from "../../city/citySlice";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Student } from "../../../models";

export interface StudentFormProps {
  initialValues?: Student
  isEdit?: boolean
  onSubmit?: (formValues: Student) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true
      const parts = value?.split(' ') || []
      return parts.filter((x) => Boolean(x)).length >= 2;

    }),
  age: yup
    .number()
    .positive('Please enter a positive number.')
    .min(0, 'Min is 0')
    .max(100, 'Max is 100')
    .integer('Please enter an integer.')
    .required('Please enter age.')
    .typeError('Please enter a valid number.'),
  mark: yup
    .number()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .required('Please enter mark.')
    .typeError('Please enter a valid number.'),
  gender: yup
    .string()
    .oneOf(['Male', 'Female'], 'Please select either male or female.')
    .required('Please select gender.'),
  city: yup.string().required('Please select city.'),
})

export default function StudentForm({ initialValues, isEdit, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<Student>({

    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    reset(initialValues)
  }, [initialValues]);

  const [error, setError] = useState<string>('');
  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField
          name="name" control={control} label="Full Name"
        />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
        />
        {/* <CheckBoxField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        /> */}
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" step={0.1} />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;{isEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

