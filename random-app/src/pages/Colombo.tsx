import ColomboTime from "../components/ColomboTime";
import { useEffect } from "react";

function Colombo() {
  useEffect(() => {
    fetch("/log-visit/colombo", { method: "POST" }).catch(console.error);
  }, []);
  return <ColomboTime />;
}

export default Colombo;
