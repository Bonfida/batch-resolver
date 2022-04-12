import { useState, useRef } from "react";
import { ButtonBorderGradient } from "../Buttons";
import { resolve } from "./handle";
import { useConnection } from "@solana/wallet-adapter-react";
import _ from "lodash";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { ResultTable } from "./ResultTable";
import { Result } from "./types";

const DomainInput = () => {
  const toastId = useRef(null as any);
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState("");
  const [result, setResult] = useState<Result[] | null>(null);

  const handleResolve = async () => {
    try {
      let names: Result[] = domains
        .split(/[\s,\n]+/)
        .map((e) => e.split(".sol")[0].replace(/"|'/g, ""))
        .filter((e) => !!e && e !== ".sol")
        .map((e) => {
          return {
            name: e,
            registered: false,
            fixedPrice: false,
            tokenized: false,
            auction: false,
            owner: "",
          };
        });
      names = _.uniqWith(names, _.isEqual);

      if (names.length > 50) {
        toastId.current = toast("Cannot resolve more than 50 domains", {
          type: toast.TYPE.INFO,
        });
        return;
      }

      setLoading(true);
      names = await Promise.all(names.map((e) => resolve(connection, e)));
      setResult(names);
    } catch (err) {
      console.log(err);
      toastId.current = toast("Error resolving domains", {
        type: toast.TYPE.INFO,
      });
    }
    setLoading(false);
  };

  return (
    <div className="w-[90%] lg:w-1/2 h-[90%] flex flex-col justify-center items-center">
      <h2 className="text-5xl font-bold m-1">Bulk search</h2>
      <span className="mb-3 font-bold opacity-50 text-center">
        Separators: commas, spaces, new lines - Max 50 domains per requests
      </span>
      <textarea
        value={domains}
        onChange={(e) => setDomains(e.target.value.toLowerCase())}
        className="textarea textarea-info w-full h-[40vh] text-white font-bold text-xl"
        placeholder="Enter domains"
      />
      <div className="flex flex-col lg:flex-row w-full justify-around">
        <ButtonBorderGradient
          disabled={!domains}
          onClick={handleResolve}
          containerClass="mt-5 w-full lg:w-[45%]"
          buttonClass="bg-black w-full p-2 uppercase font-bold h-[50px] flex flex-row justify-center items-center"
          fromColor="green-400"
          toColor="blue-500"
        >
          {loading ? <Loading /> : "Search"}
        </ButtonBorderGradient>
        <ButtonBorderGradient
          onClick={() => setDomains("")}
          containerClass="mt-5 w-full lg:w-[45%]"
          buttonClass="bg-black w-full p-2 uppercase font-bold h-[50px]"
          fromColor="green-400"
          toColor="blue-500"
        >
          Clear
        </ButtonBorderGradient>
      </div>
      {result && (
        <>
          <h2 className="text-5xl font-bold m-3 my-5">Search results</h2>
          <ResultTable data={result} />
        </>
      )}
    </div>
  );
};

export default DomainInput;
