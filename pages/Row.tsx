import type { NextComponentType, NextPage } from 'next'
import { BsFillSquareFill } from "react-icons/bs";

interface Props {
  chain: ChainDetails,
}

interface ChainDetails {
  status?: boolean,
  name: string,
  icon: string,
  tokenSymbol: string[],
  tokenDecimals: number[],
}

const Row: NextPage<Props> = ({ chain }) => {
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
        <img className="icon" src={'https://sub.id/images/' + chain['icon']} alt={chain['name']} width="20" height="20" />
        <span className="company-name">{chain['name']}</span>{" "}
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
