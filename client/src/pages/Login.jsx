import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  if (user?.uid) {
    navigate("/");
    return;
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
