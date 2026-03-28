import { Button } from "@chore-chief/ui";

interface FooterLinkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const FooterLinkButton = ({ children, onClick }: FooterLinkButtonProps) => (
  <Button variant="link" size="sm" justifyContent="flex-start" p={0} minH="auto" h="auto" onClick={onClick}>
    {children}
  </Button>
);

export default FooterLinkButton;
