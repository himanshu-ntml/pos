import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { decrypt } from "@server/src/utils";
import { login as signUp } from "@/api/auth";


type User = {
  // Add appropriate user properties based on your authentication system
  email?: string;
  // ...other user details
};

interface useAuth {
  isAuthenticated: boolean;
  user?: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
function getCookie(name: string) {
  const cookieValue = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return cookieValue ? cookieValue.pop() : "";
}

function useAuth(): useAuth {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const { toast } = useToast();
  
  const login = async (email: string, password: string) => {
    const body = JSON.stringify({ email, password });
    console.log("USE AUTH HOOK : ", body);
    try {
      const response = await signUp({ email, password });

      if ("session" in response) {
        const data = await decrypt(response.session);
        console.log("DATA ", data);
        setIsAuthenticated(true);
        setUser(response.user); // Assuming successful response includes user data
        toast({ title: "Login successful" });
      } else {
        // Handle login failure
        console.error("Login failed:", response.data.error);
        toast({ title: "Login failed", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({ title: "Error during login", variant: "destructive" });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
    // Clear token or user data
  };

  useEffect(() => {
    // Check for existing authentication status from storage or other sources
    const storedToken = getCookie("session");
    console.log("USE EFFECT : ", { storedToken });
    if (storedToken) {
      // Verify token validity and set authentication state
      // Fetch user data (if relevant) and update user state
      const fetchUserData = async () => {
        try {
          const response = await fetch("/api/user", {
            headers: { Authorization: `Bearer ${storedToken}` },
          }).then((res) => res.json());
          if (response.data.success) {
            setIsAuthenticated(true);
            setUser(response.data.user);
          } else {
            // Handle invalid token or error
            console.error("Token is invalid or expired.");
            logout();
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, []);

  return { isAuthenticated, user, login, logout };
}

export default useAuth;
