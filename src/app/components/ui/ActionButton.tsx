import { Button, ButtonProps } from "@mui/material";

interface ActionButtonProps extends ButtonProps {
  text: string;
}

export function ActionButton({ text, ...props }: ActionButtonProps) {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{ height: "40px" }}
      {...props}
    >
      {text}
    </Button>
  );
}

