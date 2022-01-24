import type { NextPage } from 'next'
import Image from "next/image"
import { BsFillSquareFill } from "react-icons/bs";

import { ChainDetails } from "../pages/index"

interface Props {
  chain: ChainDetails,
}

// Component to render the row of the table.
// Shows the name, status, token symbol and token decimal with availability.
const Row: NextPage<Props> = ({ chain }) => {

  // Converting arrays to string for the method. 
  var symbols = ''
  chain.tokenSymbol.forEach((i) => {
    symbols += i + ' | '
  })
  symbols = symbols.substring(0, symbols.length - 2);


  var decimals = ''
  chain.tokenDecimals.forEach((i) => {
    decimals += i + ' | '
  })
  decimals = decimals.substring(0, decimals.length - 2);

  return (
    <>
      <td data-column="Name" className="name-td">
        <Image className="icon" src={'https://sub.id/images/' + chain['icon']} alt={chain['name']} width="20" height="20" priority />
        <span className="company-name"> {chain['name']}</span>{" "}
      </td>

      <td data-column="Status">
        {chain['status'] ? (
          <BsFillSquareFill color="green" />
        ) : (
          <BsFillSquareFill color="red" />
        )}
      </td>

      <td data-column="Token Symbol">{symbols}</td>
      <td data-column="Token Decimal">{decimals}</td>
    </>
  );
};

export default Row;
