import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event, newLang) => {
    if (newLang) {
      i18n.changeLanguage(newLang);
    }
  };

  return (
    <Box
      sx={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "30px",
        p: "4px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <ToggleButtonGroup
        value={i18n.language?.slice(0, 2)}
        exclusive
        onChange={handleChange}
        size="small"
        sx={{
          gap: "4px",
        }}
      >
        <ToggleButton value="en" sx={btnStyle}>
          EN
        </ToggleButton>

        <ToggleButton value="hi" sx={btnStyle}>
          हिंदी
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

const btnStyle = {
  border: "none",
  borderRadius: "20px",
  px: 2,
  py: 0.5,
  fontWeight: 600,
  fontSize: "13px",
  textTransform: "none",
  color: "#334155",
  minWidth: "60px",
  transition: "all 0.3s ease",

  "&.Mui-selected": {
    background: "linear-gradient(45deg,#00c6ff,#0072ff)",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,198,255,0.4)",
  },

  "&:hover": {
    background: "rgba(0,114,255,0.08)",
  },
};

export default LanguageSwitcher;