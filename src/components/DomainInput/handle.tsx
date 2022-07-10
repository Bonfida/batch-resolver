import { Result } from "./types";
import { Connection } from "@solana/web3.js";
import {
  resolveDomain,
  resolveFixedPrice,
  resolveAuction,
} from "../../utils/resolver";

export const resolve = async (connection: Connection, name: Result) => {
  const now = new Date().getTime() / 1_000;
  let fixedPrice = false;
  let auction = false;

  const { registered, owner, pubkey, content } = await resolveDomain(
    connection,
    name.name
  );

  if (registered && owner) {
    // If registered:
    // - Check if auctioned
    // - Check if fixed price
    fixedPrice = await resolveFixedPrice(connection, owner);
    const endTime = await resolveAuction(connection, pubkey);

    if (!!endTime && endTime > now) {
      auction = true;
    }
  } else {
    // If no registered:
    // - Check if auction exist
    const endTime = await resolveAuction(connection, pubkey);
    auction = !!endTime;
  }

  name.auction = auction;
  name.fixedPrice = fixedPrice;
  name.registered = registered;
  name.owner = owner?.toBase58();
  name.content = content;

  return name;
};
