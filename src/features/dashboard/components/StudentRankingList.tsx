import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import { Student } from '../../../models';

export interface StudentRankingListProps {
   studentList: Student[];
}

export default function StudentRankingList({ studentList }: StudentRankingListProps) {
   return (
      <TableContainer>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell align='center'>#</TableCell>
                  <TableCell align='left'>Name</TableCell>
                  <TableCell align='right'>Mark</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {studentList.map((student, index) => (
                  <TableRow key={student.id}>
                     <TableCell align='center'>{index + 1}</TableCell>
                     <TableCell align='left'>{student.name}</TableCell>
                     <TableCell align='right'>{student.mark}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
