import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TextField, Link, Box, RadioGroup, Typography, Container, FormControlLabel, Radio} from '@material-ui/core';
import Portrait from '@material-ui/icons/Portrait';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";

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
}));

async function createProfile(data, props) {
    fetch('/api/profiles', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'multipart/form-data',
        "Accept": "application/json",
        "type": "formData"
      }),
      body: data
    })
      .then(data => data.json())
      .then((result) => {
           if(result.status === "Success") {
              localStorage.setItem ("token", result.token);
              props.history.push('/profile');
            } else {
              alert("아이디 및 패스워드가 일치하지 않습니다.")
              props.history.push('/');
            }
       });
    
   }

export default function CreateProfileForm(props) {
  const classes = useStyles(); 
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log("submit ")
    createProfile(data, props)
  };

  const handleRadioChange = event => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Portrait />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register('name', {
                required: true
                })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="이름"
                name="name"
                autoComplete="on"
                autoFocus
            />
            <TextField
            {...register('file', {
            required: true
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="file"
            label="프로필 사진"
            name="file"
            type="file"
            autoComplete="on"
            autoFocus
             />
            <RadioGroup label="성별" aria-label="sex" name="sex" value={value} onChange={handleRadioChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
           </RadioGroup>
            <TextField
                {...register('dob', {
                required: true
                })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="dob"
                id="dob"
                type="date"
                autoComplete="on"
            />
            <TextField
                {...register('address', {
                required: true
                })}
                variant = "outlined"
                margin="normal"
                required
                fullWidth
                name="address"
                label="주소"
                id="address"
                autoComplete="off"
            />
            <TextField
                {...register('job', {
                required: true
                })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="job"
                label="직업"
                id="job"
                autoComplete="on"
            />
            <TextField
                {...register('phone', {
                required: true
                })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="phone"
                label="전화번호"
                id="phone"
                autoComplete="on"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
            Save
            </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}