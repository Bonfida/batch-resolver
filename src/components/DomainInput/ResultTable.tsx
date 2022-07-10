import { Result } from "./types";
import { CheckIcon, BanIcon, LinkIcon } from "@heroicons/react/solid";
import { Link } from "../Link";
import Urls from "../../settings/urls";
import { ExplorerButton } from "../Buttons";

export const ResultTable = ({ data }: { data: Result[] }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Registered</th>
            <th>For sale</th>
            <th>Unclaimed</th>
            <th>Owner</th>
            <th>Inspect</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              { name, registered, fixedPrice, auction, owner, content },
              idx
            ) => {
              const forSale = fixedPrice || auction;
              const unclaimed = auction && !registered;
              return (
                <tr>
                  <td className="font-bold">{name}.sol</td>
                  <td>
                    {registered ? (
                      <CheckIcon className="h-[30px] text-green-600" />
                    ) : (
                      <BanIcon className="h-[30px] text-red-600" />
                    )}
                  </td>
                  <td>
                    {forSale && !unclaimed ? (
                      <CheckIcon className="h-[30px] text-green-600" />
                    ) : (
                      <BanIcon className="h-[30px] text-red-600" />
                    )}
                  </td>
                  <td>
                    {unclaimed ? (
                      <CheckIcon className="h-[30px] text-green-600" />
                    ) : (
                      <BanIcon className="h-[30px] text-red-600" />
                    )}
                  </td>
                  <td className="font-bold">
                    {owner ? <ExplorerButton pubkey={owner} /> : null}
                  </td>
                  <td>
                    <Link href={Urls.naming + name} className="btn">
                      <LinkIcon className="h-[25px]" />
                    </Link>
                  </td>
                  <td className="font-bold">{content}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};
