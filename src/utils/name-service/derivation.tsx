import { PublicKey } from "@solana/web3.js";
import * as sns from "@bonfida/spl-name-service";
import { SOL_TLD_AUTHORITY } from "./constants";

export const derive = async (
  name: string,
  parent: PublicKey = SOL_TLD_AUTHORITY
) => {
  let hashed = await sns.getHashedName(name);
  let pubkey = await sns.getNameAccountKey(hashed, undefined, parent);
  return { pubkey, hashed };
};
