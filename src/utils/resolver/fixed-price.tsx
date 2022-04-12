import { PublicKey, Connection } from "@solana/web3.js";

/** Mainnet program ID */
export const NAME_OFFERS_ID = new PublicKey(
  "85iDfUvr3HJyLM2zcq5BXSiDvUWfw6cSE1FfNBo8Ap29"
);

export const resolveFixedPrice = async (
  connection: Connection,
  owner: PublicKey
) => {
  const info = await connection.getAccountInfo(new PublicKey(owner));
  return !!info?.owner.equals(NAME_OFFERS_ID);
};
