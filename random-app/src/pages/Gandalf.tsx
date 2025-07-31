import Catdalf from "../components/Catdalf";
import { useEffect } from "react";

function Gandalf() {
  useEffect(() => {
    fetch("/log-visit/gandalf", { method: "POST" }).catch(console.error);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Catdalf />
    </div>
  );
}

export default Gandalf;
