import { getByDisplayValue } from "@testing-library/react";
import { ListParams, ListResponse, Student } from "../models"
import axiosClient from "./axiosClient";
import { v4 as uuidv4 } from 'uuid';
const studentApi = {
   getAll(params: ListParams): Promise<ListResponse<Student>> {
      const url = '/students';
      return axiosClient.get(url, { params });
   },
   getById(id: string): Promise<Student> {
      const url = `/students/${id}`;
      return axiosClient.get(url);
   },
   add(data: Student): Promise<Student> {
      const url = '/students';
      const id = uuidv4()
      return axiosClient.post(url, { ...data, id });
   },
   update(data: Student): Promise<Student> {
      const url = `/students/${data.id}`;
      return axiosClient.patch(url, data);
   },
   remove(id: string): Promise<any> {
      const url = `/students/${id}`;
      return axiosClient.delete(url);
   },
}

export default studentApi