import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { register } from "../../context/actions/AuthAction";
import { clearErrors } from "../../context/actions/ErrorActions";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import { REGISTER_FAIL } from "../../context/types";
import Alert from "@material-ui/lab/Alert";
import { v4 as uuidv4 } from "uuid";
import { SIGN_IN, MARKET_LANDING } from "../../path";
import { NavLink } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const error = useSelector((state: RootState) => state.error);

  const [message, setMessage] = useState<string[] | null>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!name || !email || !password) {
      alert("missing fields");
    } else {
      const newUser = { name, email, password };

      dispatch(register(newUser));
    }
  };

  useEffect(() => {
    if (error.id === REGISTER_FAIL) {
      setMessage([REGISTER_FAIL]);
    } else {
      setMessage(null);
    }

    // If Auth success go to Market Landing page
    if (isAuthenticated) {
      history.push(MARKET_LANDING);
      clearErrors();
    }
  }, [error, isAuthenticated, history]);

  const alertMessage =
    message &&
    message.length > 0 &&
    message.map((msg) => (
      <Alert severity="error" key={uuidv4()}>{`${msg.replace(
        /_/g,
        " "
      )}`}</Alert>
    ));

  return (
    <div className="min-h-screen">
      <div className="p-5">
        <Container maxWidth="sm">
          <Paper elevation={3} className="p-3">
            <Typography gutterBottom={true} variant={"h6"}>
              Sign-Up
            </Typography>
            {message ? alertMessage : null}
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <TextField
                  id="regName"
                  label="Name"
                  variant="outlined"
                  name="regName"
                  className="mb-3"
                  value={name}
                  onChange={handleName}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="regEmail"
                  name="regEmail"
                  label="Email Address"
                  variant="outlined"
                  className="mb-3"
                  value={email}
                  onChange={handleEmail}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  type="password"
                  id="regPassword"
                  label="Password"
                  variant="outlined"
                  name="regPassword"
                  className="mb-3"
                  value={password}
                  onChange={handlePassword}
                />
              </FormControl>
              <FormControl fullWidth>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Sign Up
                </Button>
              </FormControl>
            </form>
            <div className="w-100 d-flex flex-column align-items-center">
              <Typography variant={"subtitle1"}> or</Typography>
              <NavLink exact to={SIGN_IN} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary" size="small">
                  Sign In
                </Button>
              </NavLink>
            </div>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default Register;
