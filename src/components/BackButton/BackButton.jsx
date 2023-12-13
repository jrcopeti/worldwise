import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function BackButton({ reason }) {
  const navigate = useNavigate();

  if (reason === "back-1")
    return (
      <Button
        type="back"
        reason="back-1"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    );
  if (reason === "back-form")
    return (
      <Button
        reason="back-form"
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate("/app/cities");
        }}
      >
        &larr; Back
      </Button>
    );

    if (reason === "home")
    return (
      <Button
        reason="home"
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        &larr; Back
      </Button>
    );
}

export default BackButton;
