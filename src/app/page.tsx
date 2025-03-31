"use client"

import React from 'react';
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useUserActions} from "@/hooks/useUserActions";
import {ModalDialog} from "@/components/ModalDialog"
import {capitalize} from "@/utils/capitalize";

export default function UserTable() {
  const {
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
  } = useUserActions()

  const modalProps = {
    add: {
      modalBody: "",
      confirmButtonLabel: 'Create',
      inputValue: name,
      handleOnChangeText: handleSetName,
      handleOnSubmit: handleCreateUser,
    },
    update: {
      modalBody: "",
      confirmButtonLabel: 'Update',
      inputValue: selectedUser?.name,
      handleOnChangeText: handleSetSelectedUser,
      handleOnSubmit: handleUpdateUser,
    },
    delete: {
      modalBody: <span>Are you sure you want to delete <strong>{selectedUser?.name}</strong>. This action cannot be undone.</span>,
      confirmButtonLabel: 'Delete',
      handleOnSubmit: handleDeleteUser,
    }
  }

  return (
      <Container maxWidth="md" sx={{mt: 4}}>
        <Typography variant="h5" gutterBottom>
          User Management
        </Typography>

        <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon/>}
            sx={{mb: 2, float: "right"}}
            onClick={handleOpenDialog("add")}
        >
          Create User
        </Button>

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
              {isLoading ? (
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
                              onClick={handleOpenDialog("update", user)}
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

        <ModalDialog
            {...modalProps[dialogType as keyof typeof modalProps] ?? {}}
            isOpen={isOpen}
            title={`${capitalize(dialogType)} User`}
            type={["add", "update"].includes(dialogType) ? "input" : "text"}
            handleCloseDialog={handleCloseDialog}
            handleOnCancel={handleCloseDialog}
        />
      </Container>
  );
}
