import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Chart from "../components/Chart";
import Table from "../components/Table";

const getCurrentPrice = async () => {
  const data = await axios.get(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );
  return data;
};

const Dashboard = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["currentPrice"],
    queryFn: getCurrentPrice,
    refetchInterval: 10000,
  });
  console.log(data?.data?.time);
  return (
    <>
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 mb-20">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="#" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Currency Rate
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <div className="hidden mt-2 mr-4 sm:inline-block">
              <span></span>
            </div>
          </div>
        </div>
      </nav>
      <div className="absolute top-16 right-8">
        <div className="text-gray-400">
          Last updated: {data?.data?.time?.updated}
        </div>
      </div>
      {data?.data && <Chart data={data.data} />}
      {data?.data && <Table data={data.data} />}
    </>
  );
};

export default Dashboard;
