import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

import Row from "../components/Row"

// Props type for the Home Page.
type Props = {
  listOfChains: ChainDetails[],
  listOfAvailableChains: ChainDetails[],
}

// Interface for the Chain Details.
export interface ChainDetails {
  status?: boolean,
  name: string,
  icon: string,
  tokenSymbol: string[],
  tokenDecimals: number[],
}

// Home Page Component.
const Home: NextPage<Props> = ({ listOfAvailableChains }) => {
  
  // State for the list of chains (having tokenDecimals & tokenSymbols).
  const [chains, setChains] = useState(listOfAvailableChains || [])
  
  // Checking for availability in every 5 minutes.
  useEffect(() => {
    setTimeout(async () => {
      const { props } = await fetchData()
      setChains(props.listOfAvailableChains)
    }, 1000 * 5 * 60)
  }, [])

  return (
    <div className={styles.container}>
      <div className="network-list-body">
        <header className="network-header">
          <h1>Dapp Conn</h1>
          <p> Check your connections instantly!</p>
        </header>

        <div className="network-record">
          <table className="network-table">
            <thead>
              <tr>
                <th className="name-th">Name</th>
                <th>Status</th>
                <th>Token Symbol</th>
                <th>Token Decimal</th>
              </tr>
            </thead>
            <tbody>
              {chains.map((d, i) => (
                <tr key={i}>
                  <Row
                    chain={d}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Fetch Data from the API about chains.
const fetchData = async () => {
  // Fetching data from sub.id api.
  const res = await fetch(`https://app.subsocial.network/subid/api/v1/chains/properties`)
  const listOfChains = await res.json()

  let listOfAvailableChains: ChainDetails[] = []

  // Filtering the list of chains having tokenDecimals & tokenSymbols.
  for (const [key, value] of Object.entries<ChainDetails>(listOfChains)) {
    if (value.tokenSymbol !== undefined && value.tokenDecimals !== undefined) {
      
      // Feteching the chain using the name to check availability status.
      await fetch(`https://app.subsocial.network/subid/api/v1/check/${key}`).then(response => response.json()).then(data => {
        let chain = value
        chain.status = data
        listOfAvailableChains.push(value)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  // Pass listOfAvailableChains to the page via props
  // Setting the revaildate time to 5 mins for fast response.
  return { props: { listOfAvailableChains }, revalidate: 5 * 60 }
}

// getStatic Props to fetch data from the API.
// during the build time.
export async function getStaticProps() {
  return fetchData()
}

export default Home
