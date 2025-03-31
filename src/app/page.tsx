"use client"

import React from 'react';
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
import {useUserActions} from "@/hooks/useUserActions";

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

  const displayDialog = () => {
    switch (dialogType) {
      case "add":
      case "edit":
        return (
            <Dialog open={isOpen} onClose={handleCloseDialog}>
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
            <Dialog open={isOpen} onClose={handleCloseDialog}>
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
