import { useForm } from "react-hook-form";
import TestField from "../../../components/FormField/TestField";

export interface FormValues {
   FirstName: string;
};

export default function TestForm() {

   const { handleSubmit, control } = useForm<FormValues>({
      defaultValues: {
         FirstName: ""
      },
      mode: "onChange"
   });
   const onSubmit = (data: FormValues) => console.log(data);
   <form onSubmit={handleSubmit(onSubmit)}>
      <TestField control={control} name="FirstName" rules={{ required: true }} />
      <input type="submit" />
   </form>
}
