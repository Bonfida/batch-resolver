import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import { Buffer } from "buffer";

export const AUCTION_PROGRAM_ID = new PublicKey(
  "AVWV7vdWbLqXiLKFaP19GhYurhwxaLp2qRBSjT5tR5vT"
);

export const getAuctionKey = async (domainKey: PublicKey) => {
  const auctionSeeds = [
    Buffer.from("auction", "utf-8"),
    AUCTION_PROGRAM_ID.toBuffer(),
    domainKey.toBuffer(),
  ];
  const [auctionAccount] = await PublicKey.findProgramAddress(
    auctionSeeds,
    AUCTION_PROGRAM_ID
  );
  return auctionAccount;
};

export const resolveAuction = async (
  connection: Connection,
  domainKey: PublicKey
) => {
  let offset = 32 + 32 + 32;
  try {
    const auctionKey = await getAuctionKey(domainKey);
    const info = await connection.getAccountInfo(auctionKey);

    if (!info || !info.data) {
      return undefined;
    }
    const { data } = info;
    let tag = data.slice(offset, offset + 1)[0];

    if (tag === 0) {
      offset += 2;
      return new BN(info.data.slice(offset, offset + 8), "le").toNumber();
    }
    offset += 1 + 8 + 1;
    return new BN(info.data.slice(offset, offset + 8), "le").toNumber();
  } catch {
    return undefined;
  }
};
