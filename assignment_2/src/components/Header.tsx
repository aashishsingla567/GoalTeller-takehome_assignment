import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  const displayDesktop = () => {
    return <Toolbar>{Logo}</Toolbar>;
  };

  const Logo = (
    <Typography variant="h6" component="h1">
      MF Store
    </Typography>
  );

  return (
    <header>
      <AppBar
        style={{
          position: "static",
        }}
      >
        {displayDesktop()}
      </AppBar>
    </header>
  );
}
