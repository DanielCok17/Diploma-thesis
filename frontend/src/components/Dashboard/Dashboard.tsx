import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>Item 1</Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>Item 2</Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>Item 3</Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
