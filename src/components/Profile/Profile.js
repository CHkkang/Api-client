import React, {useState, useEffect} from 'react';
import {
    Link,
    Box,
    Typography,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableBody,
    TableHead,
    TableFooter,
    Avatar,
    Card
 } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Profile.css'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ChanBook.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    margin: theme.spacing(7,7,7,7),
    alignItems: 'center',
    width: '50%',
  },
  profile_image: {
    width: '150px',
    height: '150px',
  },

}));

const getProfile = async (data) => {
  // var res
  const res = await fetch('/api/profile/' + data, new Headers({
      "Content-Type": "application/json",
      'Accept': 'application/json',
  }))
  .then((data) => {
    return data.json()
  })
  return res
}

export default function Profile(props) {
  const classes = useStyles(); 
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
    const result = await getProfile(localStorage.getItem("user_id"));
    setProfile(result);
  };
    fetchData();
  }, []);

  return (
      <Card className="card">
          <div className={classes.paper}>
              <Typography component="h1" variant="h3" className={classes.typography}>
                  MyPage
              </Typography>
              <Avatar alt="Profile Image" src={profile.photo} className={classes.profile_image} />
              <TableContainer className="table">
              <Table size="small">
                  <TableHead>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                          <TableCell align="center">이름</TableCell>
                          <TableCell align="center">{profile.name}</TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell align="center">이메일</TableCell>
                          <TableCell align="center">{profile.email}</TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell align="center">생년월일</TableCell>
                          <TableCell align="center">{profile.dob}</TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell align="center">성별</TableCell>
                          <TableCell align="center">{profile.sex}</TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell align="center">직업</TableCell>
                          <TableCell align="center">{profile.job}</TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell align="center">주소</TableCell>
                          <TableCell align="center">{profile.address}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableFooter>
                    </TableFooter>
              </Table>
          </TableContainer>
          </div>
          <Box mt={8}>
              <Copyright />
          </Box>
      </Card>
  );
  }