import { sql } from "@/lib/db";
import { getUserByEmail, mockedUser } from "../query";

jest.mock("@/lib/db");

describe("getUserByEmail()", () => {
  it("returns user data", async () => {
    (sql as unknown as jest.Mock).mockResolvedValue([mockedUser.johnDoe]);

    const user = await getUserByEmail("");

    expect(user).toEqual(mockedUser.johnDoe);
  });

  it("returns null", async () => {
    (sql as unknown as jest.Mock).mockResolvedValue([]);

    const user = await getUserByEmail("");

    expect(user).toEqual(null);
  });

  it("throws an error", async () => {
    (sql as unknown as jest.Mock).mockRejectedValue("");

    await expect(getUserByEmail("")).rejects.toThrow(
      "Failed to get user data.",
    );
  });
});
