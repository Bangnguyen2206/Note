import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

export default function Login() {
  const auth = getAuth();
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  return (
    <>
      <Typography sx={{ marginBottom: "10px" }}>Welcome To Note App</Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with google
      </Button>
    </>
  );
}
