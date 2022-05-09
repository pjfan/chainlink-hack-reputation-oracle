import { BasicProfile } from "@datamodels/identity-profile-basic";
import { StreamID } from "@ceramicnetwork/streamid";
import { AccountID } from "caip";
import type { IDX } from "@ceramicstudio/idx";

export type DIDData = {
  accounts: Array<AccountID>;
  profile: BasicProfile | null;
};
export type DIDsData = Record<string, DIDData>;

export const updateProfile = async (
  idx: IDX,
  name: string,
  description: string
): Promise<StreamID | null> => {
  return (await idx.set("basicProfile", { name, description })) ?? null;
};

export const getProfile = async (idx: IDX): Promise<BasicProfile | null> => {
  try {
    return (await idx.get<BasicProfile>("basicProfile")) ?? null;
  } catch (err) {
    return null;
  }
};