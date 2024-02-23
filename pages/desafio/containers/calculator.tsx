import React, { useEffect } from "react";

import { Chart } from "../components/chart";
import { DataTable } from "../components/datatable";
import { Summary } from "../components/summary";

import { getData } from "../services/api";
import { ExchangeRate } from "../domain/exchangerate";

/**
 * Calculator component properties
 * @param apiKey API key
 */
export function Calculator({ apiKey }: { apiKey: string }) {

  // state
  const [selectedRow, setSelectedRow] = React.useState<ExchangeRate|null>(null);  // TODO: find a better name, may be it should be called "selectedExchangeRate"
  const [data, setData] = React.useState<ExchangeRate[]>([]);
  const [UFs, setUFs] = React.useState(1);  // TODO: find a better name, may be it should be called "ufAmount"

  // load data from api in async way
  useEffect(() => {
    const loadASyncData = async () => {
      const asyncData = await getData(apiKey);
      setData(asyncData);
    }

    loadASyncData();
  }, []);

  // once data changes select the first row
  useEffect(() => {
    setSelectedRow(data?.[0] || null);
  }, [data]);

  return (
    <>
      <h1 className="title-l1" >Calculadora de UF a CLP</h1>

      <div className="grid  grid-cols-3 gap-4 my-8" >

        {/* Chart */}
        <div className='col-span-2' >
          <Chart data={data} multiplier={UFs} />
        </div>
        {/* /Chart */}

        {/* Summary */}
        <div>
          <Summary ufValue={selectedRow?.value || 0} date={selectedRow?.date || new Date()} onUFsChange={setUFs} />
        </div>
        {/* /Summary */}

        {/* Data */}
        <div className='col-span-3' >
          <DataTable data={data} selectedRow={selectedRow} onChangeSelectedRow={setSelectedRow} />
        </div>
        {/* /Data */}

      </div>
    </>
  )
}
