import { useContext } from "react";
import { AuthContext} from "../context/AuthContext";

function useAuth() {
    const { auth, setAuth } = useContext(AuthContext);
  
    const signOut = () => {
      setAuth({ token: "", user: null });
    };
  
    return { auth, signOut };
  }

export default useAuth;