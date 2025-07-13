import Button from "@mui/material/Button";

export default function OutlinedButtons() {
  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          background: "white",
          color: "black",
          px: 4,
          py: 1,
          border: "2px solid gray",
          borderRadius: "9999px",
          fontSize: "1.125rem",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)", // shadow-2xl
          },
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: 1,
          textTransform: "none",
        }}
      >
        <span>Watch Demo</span>
      </Button>
    </div>
  );
}
