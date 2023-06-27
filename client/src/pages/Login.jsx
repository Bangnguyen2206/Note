/* eslint-disable no-unused-vars */
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { graphQLRequest } from "../utils/request";

export default function Login() {
  const auth = getAuth();
  // const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
  };

  // If we don't use useEffect, we need use Navigate componet instead of useNavigate
  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Typography sx={{ marginBottom: "10px" }}>Welcome To Note App</Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with google
      </Button>
    </>
  );
}
