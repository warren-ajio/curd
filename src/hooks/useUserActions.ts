import {IUser} from "@/types";
import React, {useEffect, useState} from "react";
import {createUser, deleteUser, getUsers, updateUser} from "@/services/user";


export const useUserActions = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState<string>('')
  const [dialogType, setDialogType] = useState<string>("")
  const [users, setUsers] = useState<IUser[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser>()

  const handleGetUsers = () => {
    const handleOnGetUsers = async () => {
      try {
        setIsLoading(true)
        const res = await getUsers()

        if (res) {
          setUsers(res)
          setIsLoading(false)
        }
      } catch (error) {
        console.log("error - getUser", error)
      }
    }

    handleOnGetUsers()
  }

  const handleCreateUser = async () => {
    try {
      setIsLoading(true)
      const res = await createUser({name})

      if (res) {
        handleCloseDialog()
        setIsLoading(false)
        handleGetUsers()
      }
    } catch (error) {
      console.log("error - createUser", error)
    }
  }
  const handleUpdateUser = async () => {
    try {
      setIsLoading(true)
      if (selectedUser) {
        const res = await updateUser(selectedUser)

        if (res) {
          handleCloseDialog()
          setIsLoading(false)
          handleGetUsers()
        }
      }
    } catch (error) {
      console.log("error - updateUser", error)
    }
  }

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true)
      if (selectedUser) {
        const res = await deleteUser(selectedUser.id)

        if (res) {
          handleCloseDialog()
          setIsLoading(false)
          handleGetUsers()
        }
      }
    } catch (error) {
      console.log("error - deleteUser", error)
    }
  }

  const handleCloseDialog = () => {
    setIsOpen(false)
    setName("")
  }

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)

  const handleSetSelectedUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser((prev) => {
      return {
        ...(prev ?? {} as IUser),
        name: e.target.value
      }
    })
  }

  const handleOpenDialog = (type: string, user?: IUser) => () => {
    if (user) {
      setSelectedUser((user))
    }
    setDialogType(type)
    setIsOpen(true)
  }

  useEffect(handleGetUsers, []);

  return {
    isLoading,
    isOpen,
    name,
    dialogType,
    selectedUser,
    users,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleCloseDialog,
    handleOpenDialog,
    handleSetName,
    handleSetSelectedUser,
  };
}