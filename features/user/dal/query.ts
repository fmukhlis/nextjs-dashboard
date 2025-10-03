import { sql } from "@/lib/db";
import { User } from "@/types/global";

export const getUserByEmail = async (email: string) => {
  try {
    const user =
      (await sql`SELECT * FROM users WHERE email=${email}`) as User[];

    if (user.length > 0) {
      return user[0];
    }

    return null;
  } catch {
    throw new Error("Failed to get user data.");
  }
};

export const mockedUser = {
  johnDoe: {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    password: "johndoe",
  },
  alice: {
    id: "2",
    name: "Alice",
    email: "alice@example.com",
    password: "alice",
  },
};
