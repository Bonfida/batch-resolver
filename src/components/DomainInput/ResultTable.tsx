import { Result } from "./types";
import { CheckIcon, BanIcon, LinkIcon } from "@heroicons/react/solid";
import { Link } from "../Link";
import Urls from "../../settings/urls";
import { ExplorerButton } from "../Buttons";

export const ResultTable = ({ data }: { data: Result[] }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Registered</th>
            <th>For sale</th>
            <th>Unclaimed</th>
            <th>Owner</th>
            <th>Inspect</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ name, registered, fixedPrice, auction, owner }, idx) => {
            const forSale = fixedPrice || auction;
            const unclaimed = auction && !registered;
            return (
              <tr>
                <th className="font-bold">{idx}</th>
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
                <td>{owner ? <ExplorerButton pubkey={owner} /> : null}</td>
                <td>
                  <Link href={Urls.naming + name} className="btn">
                    <LinkIcon className="h-[25px]" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
