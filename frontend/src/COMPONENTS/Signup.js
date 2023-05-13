import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
//import { SignUpUser } from "../Apis/UserApi";
//import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  // const Toast = (msg, type) =>
  //   toast(msg, { type: type, pauseOnFocusLoss: false, pauseOnHover: false });
  const [Data, setData] = useState({
    Username: "",
    email: "",
    password: "",
    Confirmpassword: "",
  });
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Data
      }),
    });
    let d = await res.json();
    console.log(d);

    //   if (Data.Confirmpassword === Data.password) {
    //     const response = await SignUpUser(
    //       Data.Username,
    //       Data.email,
    //       Data.password
    //     );
    //     if (response.success) {
    //       Toast(response.msg, "success");
    //       navigate("/login");
    //     } else {
    //       Toast("email already exists", "error");
    //     }
    //   } else {
    //     Toast("password entered is incorrect", "error");
    //   }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/*<LockOutlinedIcon />*/}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Username"
                  required
                  fullWidth
                  id="Username"
                  value={Data.Username}
                  onChange={handleChange}
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={Data.email}
                  onChange={handleChange}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={Data.password}
                  onChange={handleChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Confirmpassword"
                  label="Confirm Password"
                  value={Data.Confirmpassword}
                  onChange={handleChange}
                  type="password"
                  id="Confirmpassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={
                Data.Username.length === 0 ||
                Data.Confirmpassword.length === 0 ||
                Data.email.length === 0 ||
                Data.password.length === 0
              }
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" style={{ color: "blue" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
