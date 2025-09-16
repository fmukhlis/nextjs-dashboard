import { getCardData } from "./card";

export async function getCardDataDTO() {
  const data = await getCardData();
  return data;
}
