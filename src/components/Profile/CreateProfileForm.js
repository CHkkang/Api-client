import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  TextField, 
  Link, 
  Box, 
  Typography, 
  Container, 
  InputLabel,
  MenuItem,
} from '@material-ui/core';
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
const currencies = [
  {
    value: 'male',
    label: '남자',
  },
  {
    value: 'female',
    label: '여자',
  },
];

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
    padding: '6px 16px',
    margin: theme.spacing(3, 0, 2),
  },
}));


function appendData(data, id) {
  const formData = new FormData()
  const input = document.getElementById('photo');
  const file = input.files[0]
  for(var key in data) {
    if(key === "file"){
      formData.append(key, file);
    } else {
      formData.append(key, data[key]);
    }
  }
  formData.append("user_id", id)
  for (var pair of formData.entries()) { console.log(pair[0]+ ', ' + pair[1] + ' type : '+ typeof pair[1]) };

  return formData
}

async function createProfile(data, props) {
  const id = props.location.state.user_id
  const formData = appendData(data, id)
  fetch('/api/profiles', {
    method: 'POST',
    body: formData
  })
    .then(data => data.json())
    .then((result) => {
          if(result.status === "Success") {
            localStorage.setItem ("token", result.token)
            props.history.push({
              pathname: '/profile/mypage',
              state: {user_id: result.user_id}
            });
          } else {
            alert("프로필 형식 오류!")
          }
      })
}

export default function CreateProfileForm(props) {
  const classes = useStyles() 
  const [currency, setCurrency] = React.useState('male');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    createProfile(data, props)
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
            <Box mb={1}>
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
            </Box>
            <InputLabel>
                프로필사진
            </InputLabel>
            <TextField
              {...register('file', {
              required: true
              })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="photo"
              name="file"
              type="file"
              autoComplete="on"
              autoFocus
              inputProps={{ accept: 'image/*' }}
             />
             <Box mb={1}>
              <TextField
                {...register('sex', {
                required: true
                })}
                variant="outlined"
                margin="normal"
                id="sex"
                required
                name="sex"
                autoComplete="on"
                select
                label="성별"
                value={currency}
                onChange={handleChange}
                fullWidth
                autoFocus
                >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <InputLabel>
            생년월일
            </InputLabel>
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
              {...register('email', {
              required: true
              })}
              variant = "outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="이메일"
              type="email"
              id="email"
              autoComplete="off"
              helperText="이메일 형식에 맞게 입력하세요"
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
              inputProps={{ pattern: "[0-9]*" }}
              helperText="숫자만 입력하세요"
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