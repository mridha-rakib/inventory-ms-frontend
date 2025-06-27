import { useSelector } from "react-redux";
import { toast } from "sonner";

const PermissionsGuard = ({
  children,
  requiredPermission = "user",
  fallback = null,
  showToast = false,
  toastMessage = "You don't have permission to access this feature",
}) => {
  const { userInfo } = useSelector((state) => state.auth);

  const user = userInfo?.data.user;

  const hasPermission = () => {
    if (!user) return false;

    switch (requiredPermission) {
      case "admin":
        return user.isAdmin === true;
      case "user":
        return !!user;
      case "authenticated":
        return !!user;
      default:
        return false;
    }
  };

  if (!hasPermission()) {
    if (showToast) {
      toast.error(toastMessage);
    }
    return fallback;
  }

  return children;
};

export default PermissionsGuard;
