import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useLogoutMutation } from "@/redux/slices/usersApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout as logoutAction } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const LogoutDialog = (props) => {
  const router = useRouter();
  const { isOpen, setIsOpen } = props;
  const dispatch = useDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error); // Debug log

      // Check if it's actually a successful logout but with different response structure
      if (error?.status === 200 || error?.status === 204) {
        setIsOpen(false);
        router.push("/");
        return;
      }
      toast.error(error?.data?.message || "Failed to logout.");
    }
  };

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
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutDialog;
