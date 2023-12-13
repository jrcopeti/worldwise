import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Button/Button";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }
  return (
    <Button type="back" onClick={handleClick}>
      Logout
    </Button>
  );
}

export default Logout;
