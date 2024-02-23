import { ExchangeRate } from "../domain/exchangerate";

const query = `# graphql
query FraccionalChallenge($first: Int = 120) {
  exchange_rates: exchange_ratesCollection(
    first: $first
    filter: {
        pair_left: { eq: CLF },
        pair_right: { eq: CLP },
    }
    orderBy: { pair_at: DescNullsLast }
  ) {
    edges {
      node {
        id
        pair_at # Datetime (ISO)
        pair_numeric
      }
    }
  }
}`

/**
 * Get exchange rate data from the API
 * @param apiKey API Key
 * @returns Exchange rate data
 */
export const getData = async (apiKey: string): Promise<ExchangeRate[]> => {

  // Early terminate if api key is not defined
  if (!apiKey) throw new Error('API Key is not defined');

  // Check if data is in local storage
  const storageData = localStorage.getItem('fraccional-data');

  // if data is in local storage, return it, it will save api requests
  if (storageData)
    return JSON.parse(storageData).map(
      // Convert date strings to Date objects
      (row: { date: string | number | Date; }) => ({ ...row, date: new Date(row.date) })
    );

  // Fetch data from the api
  const response = await fetch(
    'https://api.fraccional.app/graphql/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apiKey': apiKey },
      body: JSON.stringify({ query })
    });

  // convert to json data
  const jsonData = await response.json();

  // convert api response to domain model
  const newData = jsonData.data.exchange_rates.edges.map(
    (edge: { node: { id: any; pair_at: string | number | Date; pair_numeric: string; }; }) => ({
      id: edge.node.id,
      date: new Date(edge.node.pair_at),
      value: parseFloat(edge.node.pair_numeric)
    })
  );

  // save in cache for future requests optimization
  localStorage.setItem('fraccional-data', JSON.stringify(newData));

  return newData;
}
