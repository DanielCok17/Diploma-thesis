import React, { useCallback } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';


type Report = {
    id: number;
    description: string;
    mediaType: 'image' | 'video';
    mediaURL: string;
  };

const PublicReports: React.FC = () => {
//   const onDrop = useCallback((acceptedFiles) => {
//     // Handle the files, e.g., send them to a server
//     console.log(acceptedFiles);
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: 'image/*,video/*'
//   });

  const sampleReports: Report[] = [
    {
      id: 1,
      description: 'Car accident on 5th Avenue',
      mediaType: 'image',
      mediaURL: 'https://img.etimg.com/thumb/msid-72127445,width-300,height-225,imgsize-293587,,resizemode-75/road-accident.jpg',
    },
    {
      id: 2,
      description: 'Fallen tree near central park',
      mediaType: 'video',
      mediaURL: 'https://www.youtube.com/shorts/-Z3cIYXR7lk',
    },
  ];

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Report an Accident
      </Typography>
      {/* ... (form elements) */}
      
      <Typography variant="h6" align="center" sx={{ mt: 4, mb: 2 }}>
        Sample Reports
      </Typography>
      {sampleReports.map(report => (
        <Box key={report.id} sx={{ mb: 3 }}>
          <Typography variant="body1">
            {report.description}
          </Typography>
          {report.mediaType === 'image' ? (
            <img src={report.mediaURL} alt={report.description} style={{ width: '100%', marginTop: '10px' }} />
          ) : (
            <video controls width="100%" style={{ marginTop: '10px' }}>
              <source src={report.mediaURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </Box>
      ))}
    </Container>
  );
}

export default PublicReports;