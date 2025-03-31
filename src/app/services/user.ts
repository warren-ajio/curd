import {IUser} from "@/types";
import axios from "axios";

export const getUsers = async () => {
  try {

    const {data} = await axios.get('/api/user')

    if (data) {
      return await data
    }
  } catch (err) {
    console.log(err);
    return {error: "Failed to fetch users"};
  }
}

export const createUser = async (body: { name: string }) => {
  try {
    if (!body.name) {
      return {error: "Name is required", status: 400};
    }

    const data = await axios.post<IUser>('/api/user', body);

    if (data) {
      return data
    }
  } catch (err) {
    console.log(err);
    return {error: "Failed to create user", status: 500};
  }
}

export const updateUser = async (body: IUser) => {
  try {
    if (!body) {
      return {error: "No user selected.", status: 400};
    }

    const data = await axios.put<IUser>('/api/user', body);

    if (data) {
      return data
    }
  } catch (err) {
    console.log(err);
    return {error: "Failed to create user", status: 500};
  }
}

export const deleteUser = async (id: bigint) => {
  try {
    if (!id) {
      return {error: "No user selected.", status: 400};
    }

    const data = await axios.delete('/api/user', {
      data: {
        id
      }
    });

    if (data) {
      return data
    }
  } catch (err) {
    console.log(err);
    return {error: "Failed to create user", status: 500};
  }
}