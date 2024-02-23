import React, { useEffect, useState } from "react";

import { formatCLP } from "../services/utils";

/**
 * Summary component properties
 */
interface SummaryProps {
  ufValue: number;
  date: Date;
  onUFsChange: (value: number) => void;
};

/**
 * Display a summary with the exchange rate data
 * @param ufValue UF value
 * @param date Date of the UF value
 * @param onUFsChange Callback to notify UF amount change
 * @returns React.Component
 */
export const Summary = ({ ufValue, date, onUFsChange }: SummaryProps) => {

  const [UFAmount, setUFAmount] = useState(1);
  const [CLPTotal, setCLPTotal] = useState(ufValue);

  const hanldeAmountChange = (value: number) => {
    setUFAmount(Math.abs(value));
    // notify to parent layers
    // TODO: this is a good candidate to use a callback
    onUFsChange(Math.abs(value));
  };

  useEffect(() => {
    setCLPTotal(UFAmount * ufValue);
  }, [UFAmount, ufValue]);

  return (
    <>
      <div className="text-2xl my-4" >
        <input value={UFAmount} onChange={(e) => hanldeAmountChange(parseInt(e.target.value))} type="number" className="text-input" ></input>
        <span> | UF</span>
      </div>
      <div className="text-gray-400" >
        equivale a
      </div>
      <div className="pt-2 text-5xl text-yellow-600" >
        CLP {formatCLP(CLPTotal)}
      </div>
      <div className="pt-2 text-gray-400" >
        al {date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
      </div>
    </>
  );
};


