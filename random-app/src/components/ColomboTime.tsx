function ColomboTime() {
  return (
    <h1>
      Current Colombia time:{" "}
      {new Date().toLocaleTimeString("en-US", { timeZone: "America/Bogota" })}
    </h1>
  );
}

export default ColomboTime;
