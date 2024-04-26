import { NewUser } from "../../../server/src/schemas";

const BASE_URL = import.meta.env.VITE_API_URL + "/auth";

export const login = async ({ email, password }: Pick<NewUser, "email" | "password">) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return {
      error: true,
      message: "Error logging in",
    };
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
    });
    return await res.json();
  } catch (error) {
    return {
      error: true,
      message: "Error logging out",
    };
  }
};

export const register = async (newUser: NewUser) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    return await res.json();
  } catch (error) {
    return {
      error: true,
      message: "Error registering",
    };
  }
};
