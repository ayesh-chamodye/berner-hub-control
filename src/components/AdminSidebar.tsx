import { LayoutDashboard, Users, Receipt, Settings, Activity, Tag, Image, LogOut, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "@/components/ui/sidebar";
import AppIcon from "@/assets/app_icon.svg";
const menuItems = [{
  title: "Dashboard",
  url: "/",
  icon: LayoutDashboard
}, {
  title: "Expenses",
  url: "/expenses",
  icon: Receipt
}, {
  title: "Users",
  url: "/users",
  icon: Users
}, {
  title: "Ad Banners",
  url: "/banners",
  icon: Image
}, {
  title: "Support",
  url: "/support",
  icon: MessageSquare
}];
export function AdminSidebar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const {
        error
      } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
    }
  };
  return <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4 bg-orange-500">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <img src={AppIcon} alt="App Icon" className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-50">Berner</h2>
            <p className="text-xs text-violet-50">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-orange-500">
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/"} className={({
                  isActive
                }) => isActive ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : ""}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}