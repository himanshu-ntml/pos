import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { Toaster } from "@/components/ui/toaster";
import React, { useEffect } from "react";
import { useVenueSettings } from "./hooks/useVenueSettings";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

const queryClient = new QueryClient();

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

function App() {
  // const { setVenueSettings, setVenueRegularSchedule, setVenueTables } =
  //   useVenueSettings();

  // useEffect(() => {
  //   setVenueSettings();
  //   setVenueRegularSchedule();
  //   setVenueTables();
  // }, []);

  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
