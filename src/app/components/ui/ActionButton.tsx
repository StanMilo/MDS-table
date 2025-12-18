import { Button, ButtonProps } from "@mui/material";

interface ActionButtonProps extends ButtonProps {
  text: string;
}

export function ActionButton({
  text,
  variant = "action",
  sx,
  ...props
}: ActionButtonProps) {
  return (
    <Button variant={variant as any} size="small" sx={sx} {...props}>
      {text}
    </Button>
  );
}
