import * as React from 'react';
import { Control, useController, UseControllerProps } from 'react-hook-form';
import { FormValues } from '../../features/student/components/TestForm';


export default function TestField(props: UseControllerProps<FormValues>) {
   const { field, fieldState } = useController(props);
   return (
      <div>

      </div>
   );
}
