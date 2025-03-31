"use client"

import React, {useEffect, useState} from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {createUser, deleteUser, getUsers, updateUser,} from "@/app/services/user";
import {IUser} from "@/types";

export default function UserTable() {
  const [open, setOpen] = useState<boolean>(false)

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>('')
  const [dialogType, setDialogType] = useState<string>("")
  const [users, setUsers] = useState<IUser[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser>()

  const handleGetUsers = () => {
    const handleOnGetUsers = async () => {
      try {
        setLoading(true)
        const res = await getUsers()

        if (res) {
          setUsers(res)
          setLoading(false)
        }
      } catch (error) {
        console.log("error - getUser", error)
      }
    }

    handleOnGetUsers()
  }

  const handleCreateUser = async () => {
    try {
      setLoading(true)
      const res = await createUser({name})

      if (res) {
        handleCloseDialog()
        setLoading(false)
        handleGetUsers()
      }
    } catch (error) {
      console.log("error - createUser", error)
    }
  }

  const handleUpdateUser = async () => {
    try {
      setLoading(true)
      if (selectedUser) {
        const res = await updateUser(selectedUser)

        if (res) {
          handleCloseDialog()
          setLoading(false)
          handleGetUsers()
        }
      }
    } catch (error) {
      console.log("error - updateUser", error)
    }
  }

  const handleDeleteUser = async () => {
    try {
      setLoading(true)
      if (selectedUser) {
        const res = await deleteUser(selectedUser.id)

        if (res) {
          handleCloseDialog()
          setLoading(false)
          handleGetUsers()
        }
      }
    } catch (error) {
      console.log("error - deleteUser", error)
    }
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setName("")
  }

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

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
    setOpen(true)
  }

  useEffect(handleGetUsers, [])

  const displayDialog = () => {
    switch (dialogType) {
      case "add":
      case "edit":
        return (
            <Dialog open={open} onClose={handleCloseDialog}>
              <DialogTitle>{dialogType === "add" ? "Create" : "Update"} User</DialogTitle>
              <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={dialogType === "add" ? name : selectedUser?.name}
                    onChange={dialogType === "add" ? handleSetName : handleSetSelectedUser}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="error">
                  Cancel
                </Button>
                <Button
                    onClick={dialogType === "add" ? handleCreateUser : handleUpdateUser}
                    color="primary"
                >
                  {dialogType === "add" ? "Create" : "Update"}
                </Button>
              </DialogActions>
            </Dialog>
        )
      case "delete":
        return (
            <Dialog open={open} onClose={handleCloseDialog}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to delete{" "}
                  <strong>{selectedUser?.name}</strong>? This action cannot be undone.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteUser} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
        )
    }
  }

  return (
      <Container maxWidth="md" sx={{mt: 4}}>
        <Typography variant="h5" gutterBottom>
          User Management
        </Typography>

        {/* CREATE BUTTON */}
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon/>}
            sx={{mb: 2, float: "right"}}
            onClick={handleOpenDialog("add")}
        >
          Create User
        </Button>

        {/* TABLE */}
        <TableContainer component={Paper} sx={{overflowX: "auto"}}>
          <Table>
            <TableHead>
              <TableRow sx={{backgroundColor: "#1976d2"}}>
                <TableCell sx={{color: "white"}}>ID</TableCell>
                <TableCell sx={{color: "white"}}>Name</TableCell>
                <TableCell sx={{color: "white"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress/>
                    </TableCell>
                  </TableRow>
              ) : users.length > 0 ? (
                  users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>
                          <IconButton
                              color="primary"
                              onClick={handleOpenDialog("edit", user)}
                          >
                            <EditIcon/>
                          </IconButton>
                          <IconButton
                              color="error"
                              onClick={handleOpenDialog("delete", user)}
                          >
                            <DeleteIcon/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                  ))
              ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {displayDialog()}
      </Container>
  );
}
