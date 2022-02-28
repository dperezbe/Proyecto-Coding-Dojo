import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts({Message}) {
  return (
    <Stack sx={{ width: '80%' }} spacing={2} className="wrapper-card-not">
      <Alert severity="info">
        <AlertTitle>Notificación</AlertTitle>
        {Message} — <strong>check it out!</strong>
      </Alert>
      </Stack>
  );
}