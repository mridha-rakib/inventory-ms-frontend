import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { User, Crown, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo?.data?.user;

  const getRoleDisplay = (user) => {
    if (!user) return null;

    const isAdmin = user.isAdmin;
    const roleName = isAdmin ? "Admin" : "User";
    const roleIcon = isAdmin ? (
      <Crown className="w-4 h-6" />
    ) : (
      <User className="w-4 h-6" />
    );
    const roleColor = isAdmin
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-blue-100 text-blue-800 border-blue-200";

    return {
      name: roleName,
      icon: roleIcon,
      color: roleColor,
    };
  };

  const roleInfo = getRoleDisplay(user);

  return (
    <div className="w-full">
      <div className="flex h-[60px] items-center justify-between border-b border-[#00002f26] px-1 pr-5">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1" />
        </div>

        <div className="flex items-center gap-3">
          {userInfo && (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="font-medium">{userInfo.name}</span>
              </div>

              {roleInfo && (
                <div className="relative">
                  <Badge
                    variant="outline"
                    className={`${roleInfo.color} flex items-center gap-1 text-xs font-medium`}
                  >
                    {roleInfo.icon}
                    {roleInfo.name}
                  </Badge>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
