import type { RegisterUserType } from "@/interfaces/RegisterUser";
import type { User } from "@/interfaces/User";

const API = "http://127.0.0.1:8000/";


export async function getUsers(): Promise<User[] | null> {
    try {
        
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`${API}users/users/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: User[] = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return null;
    }
}

export async function getUser(id: string): Promise<User | null> {
    try {
        
        const token = localStorage.getItem("accessToken");

        const response = await fetch(`${API}users/users/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: User = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return null;
    }
}


export async function postUser(data: RegisterUserType): Promise<boolean> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}users/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to create user:", error);
    return false;
  }
}

export async function updateUser(id: string, userData: Partial<RegisterUserType>): Promise<User | null> {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(`${API}users/users/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const updatedUser: User = await response.json();
        return updatedUser;
    } catch (error) {
        console.error("Failed to update user:", error);
        return null;
    }
}



export async function deleteUser(id: string): Promise<boolean> {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(`${API}users/users/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return true; // Eliminado exitosamente
    } catch (error) {
        console.error("Failed to delete user:", error);
        return false;
    }
}


