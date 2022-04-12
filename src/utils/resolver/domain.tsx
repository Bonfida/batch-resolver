import { derive } from "../name-service";
import { Connection } from "@solana/web3.js";
import * as sns from "@bonfida/spl-name-service";

export const resolveDomain = async (connection: Connection, name: string) => {
  const { pubkey } = await derive(name);
  try {
    const { registry } = await sns.NameRegistryState.retrieve(
      connection,
      pubkey
    );
    return {
      registered: true,
      owner: registry.owner,
      pubkey,
    };
  } catch {
    return { registered: false, pubkey };
  }
};
