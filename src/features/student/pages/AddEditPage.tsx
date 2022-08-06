import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';
import customHistory from '../../../utils/history';
import StudentForm from '../components/StudentForm';



export default function AddEditPage() {
   const { studentId } = useParams<{ studentId: string }>();
   const isEdit = Boolean(studentId);
   const [student, setStudent] = useState<Student>();


   useEffect(() => {
      if (!studentId) return
      (async () => {
         try {
            const data: Student = await studentApi.getById(studentId)
            setStudent(data)
         } catch (error) {
            console.log('Failed to fetch student details', error);
         }
      })()
   }, [studentId])
   const initialValues: Student = {
      name: '',
      age: '',
      mark: '',
      gender: 'male',
      city: '',
      ...student,
   } as Student;
   const handleStudentFormSubmit = async (formValues: Student) => {
      if (isEdit) {
         await studentApi.update(formValues);
      } else {
         await studentApi.add(formValues);
      }
      // Toast success
      toast.success('Save student successfully!');

      // Redirect back to student list
      customHistory.push('/admin/students');
   }

   return (
      <Box>
         <Link to="/admin/students">
            <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
               <ChevronLeft /> Back to student list
            </Typography>
         </Link>
         <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>
         {
            <Box mt={3}>
               <StudentForm initialValues={initialValues} isEdit={isEdit} onSubmit={handleStudentFormSubmit} />
            </Box>
         }
      </Box>
   );
}
