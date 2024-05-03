import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

interface RescueCenter {
  _id: string;
  name: string;
  address: string;
  contactNumber: string;
  area: { lat: number; lng: number }[];
  userId: string;
  username: string;
}
    

const ListOfRescueCenters: React.FC = () => {
  let url = process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  const [centers, setCenters] = useState<RescueCenter[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRescueCenters = async () => {
      try {
        const response = await axios.get<RescueCenter[]>(`${url}/rescue-center`);
        setCenters(response.data);
      } catch (error) {
        console.error('Error fetching rescue centers:', error);
      }
    };

    fetchRescueCenters();
  }, []); 

  const handleEdit = (id: string) => {
    setEditId(id);
  };

  const handleSave = async (id: string) => {
    try {
      const updatedCenter = centers.find(center => center._id === id);
      if (updatedCenter) {
        await axios.put(`${url}/rescue-center/${id}`, updatedCenter);
        setEditId(null);
      } else {
        console.error("Center not found for ID:", id);
      }
    } catch (error) {
      console.error("Error updating rescue center:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    // Optionally reset the data to initial state if changes are not saved
  };

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: string,
      field: keyof RescueCenter
    ) => {
      const newCenters = centers.map(center => {
        if (center._id === id) {
          return { ...center, [field]: event.target.value };
        }
        return center;
      });
      setCenters(newCenters);
    };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Dispatcher Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {centers.map((center) => (
            <TableRow key={center._id}>
              <TableCell>{center._id}</TableCell>
              <TableCell>
                {editId === center._id ? (
                  <TextField
                    value={center.name}
                    onChange={(e) => handleChange(e, center._id, 'name')}
                    size="small"
                  />
                ) : (
                  center.name
                )}
              </TableCell>
              <TableCell>
                {editId === center._id ? (
                  <TextField
                    value={center.address}
                    onChange={(e) => handleChange(e, center._id, 'address')}
                    size="small"
                  />
                ) : (
                  center.address
                )}
              </TableCell>
              <TableCell>
                {editId === center._id ? (
                  <TextField
                    value={center.contactNumber}
                    onChange={(e) => handleChange(e, center._id, 'contactNumber')}
                    size="small"
                  />
                ) : (
                  center.contactNumber
                )}
              </TableCell>
              <TableCell>
                {center.username}
              </TableCell>
              <TableCell>
                {editId === center._id ? (
                  <>
                    <IconButton onClick={() => handleSave(center._id)}><SaveIcon /></IconButton>
                    <IconButton onClick={handleCancel}><CancelIcon /></IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEdit(center._id)}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListOfRescueCenters;
