import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useLogoutMutation } from "@/redux/slices/usersApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutDialog = (props) => {
  const router = useRouter();
  const { isOpen, setIsOpen, onLogoutSuccess } = props;

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error(err?.data?.message || "Failed to logout.");
    }
  }, [logout, isLoading, router, setIsOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              This will end your current session and you will need to log in
              again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={isLoading} type="button" onClick={handleLogout}>
              {isLoading && <Loader className="animate-spin" />}
              Sign out
            </Button>
            <Button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutDialog;
