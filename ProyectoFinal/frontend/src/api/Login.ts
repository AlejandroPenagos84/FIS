const API = "http://127.0.0.1:8000/";

export async function loginUser(data: { userLogin: string; userPassword: string }) {
  try {
    const response = await fetch(`${API}users/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.userLogin,
        password: data.userPassword,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const tokens = await response.json(); // { access: "...", refresh: "..." }

    // Guarda los tokens, por ejemplo en localStorage (no es la forma más segura)
    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);

    return tokens; // o redirige al usuario, etc.
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
