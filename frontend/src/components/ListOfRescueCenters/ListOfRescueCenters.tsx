// // src/components/ListOfRescueCenters.tsx
// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { useNavigate } from 'react-router-dom';

// // Typ pre záchranné centrum
// interface RescueCenter {
//   id: number;
//   name: string;
//   location: string;
// }

// // Testovacie údaje
// const rescueCenters: RescueCenter[] = [
//   { id: 1, name: 'Center A', location: 'Location A' },
//   { id: 2, name: 'Center B', location: 'Location B' },
//   // Ďalšie centrá podľa potreby...
// ];

// const ListOfRescueCenters: React.FC = () => {
//   const navigate = useNavigate();

//   // Funkcia na úpravu záchranného centra
//   const handleEdit = (centerId: number) => {
//     // Tu by sa mala vykonať logika na úpravu záchranného centra
//     // Pre navigáciu môžete použiť `navigate` z React Router DOM
//     console.log(`Editing center with ID: ${centerId}`);
//     navigate(`/edit-center/${centerId}`); // Navigácia na stránku úprav
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Location</TableCell>
//             <TableCell>Edit</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rescueCenters.map((center) => (
//             <TableRow key={center.id}>
//               <TableCell>{center.id}</TableCell>
//               <TableCell>{center.name}</TableCell>
//               <TableCell>{center.location}</TableCell>
//               <TableCell>
//                 <IconButton onClick={() => handleEdit(center.id)}>
//                   <EditIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ListOfRescueCenters;

import React, { useState } from 'react';
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

interface RescueCenter {
  id: number;
  name: string;
  location: string;
}

const rescueCentersData: RescueCenter[] = [
  { id: 1, name: 'Center A', location: 'Location A' },
  { id: 2, name: 'Center B', location: 'Location B' },
];

const ListOfRescueCenters: React.FC = () => {
  const [centers, setCenters] = useState<RescueCenter[]>(rescueCentersData);
  const [editId, setEditId] = useState<number | null>(null);

  const handleEdit = (center: RescueCenter) => {
    setEditId(center.id);
  };

  const handleSave = (id: number) => {
    setEditId(null); // Save data to your state or backend here
  };

  const handleCancel = () => {
    setEditId(null);
    // Optionally reset the data to initial state if changes are not saved
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, // Updated type here
    id: number,
    field: keyof RescueCenter
  ) => {
    const newCenters = centers.map(center => {
      if (center.id === id) {
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
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {centers.map((center) => (
            <TableRow key={center.id}>
              <TableCell>{center.id}</TableCell>
              <TableCell>
                {editId === center.id ? (
                  <TextField
                    value={center.name}
                    onChange={(e) => handleChange(e, center.id, 'name')}
                    size="small"
                  />
                ) : (
                  center.name
                )}
              </TableCell>
              <TableCell>
                {editId === center.id ? (
                  <TextField
                    value={center.location}
                    onChange={(e) => handleChange(e, center.id, 'location')}
                    size="small"
                  />
                ) : (
                  center.location
                )}
              </TableCell>
              <TableCell>
                {editId === center.id ? (
                  <>
                    <IconButton onClick={() => handleSave(center.id)}><SaveIcon /></IconButton>
                    <IconButton onClick={handleCancel}><CancelIcon /></IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEdit(center)}>
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
