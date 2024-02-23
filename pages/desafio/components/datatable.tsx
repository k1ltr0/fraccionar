import React from "react";

import { formatCLP } from "../services/utils";
import { ExchangeRate } from "../domain/exchangerate";

/**
 * DataTable component properties
 */
interface DataTableProps {
  data: ExchangeRate[];
  selectedRow: ExchangeRate | null;
  onChangeSelectedRow: (row: ExchangeRate) => void;
};

/**
 * Display a table with the exchange rate data
 * @param data Exchange rate data
 * @param selectedRow Selected row for calculation
 * @param onChangeSelectedRow Callback to notify selected row change
 * @returns React.Component
 */
export const DataTable = ({ data, selectedRow, onChangeSelectedRow }: DataTableProps) => {
  return (
    <>
      <h2 className="title-l2" >Datos históricos</h2>

      <table className="data-table" >
        <thead>
          <tr className='data-row' >
            <th>Fecha</th>
            <th>Valor de la UF</th>
            <th>Calcular usando este valor</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((row) => (
              <tr className='data-row' key={row.id} >
                <td className='capitalize' >
                  { row.date.toISOString().split('T')[0] }
                </td>
                <td>CLP {formatCLP(row.value)}</td>
                <td>
                  {
                    selectedRow?.id !== row.id &&
                      <button onClick={() => { onChangeSelectedRow(row) }} className='btn' >
                        Seleccionar
                      </button>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}
