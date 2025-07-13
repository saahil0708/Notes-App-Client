import Button from "@mui/material/Button";
import { ArrowRight } from "lucide-react";

export default function BasicButtons() {
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(to right, #2563EB, #9333EA)",
          color: "white",
          px: 4,
          py: 1,
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
        <span>Get Started Free</span>
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
