import React from 'react'
import { useTable } from 'react-table'

const IneditableCell = ({
  value: initialValue,
  row: { index },
  column: { id }
}) => {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} readOnly={true} />
}

function Table({ columns, data, UserData, retrieveid, populateTransactions}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
      UserData,
      retrieveid,
      populateTransactions
    }
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

function Transactions() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Ticker',
        accessor: 'tickerId',
        Cell: IneditableCell
      },
      // {
      //   Header: 'Type',
      //   accessor: 'transType',
      //   Cell: IneditableCell
      // },
      {
        Header: 'Quantity',
        accessor: 'amount',
        Cell: IneditableCell
      },
    ],
    []
  )

  const [data,setData] = React.useState(React.useMemo(
    () => [
      {tickerId : 'AABB', amount: '2000'}
    ],[]))

  populateTransactions()
  
  async function populateTransactions () {
    let userid = await retrieveid()
    let transdata = await UserData(userid)
    console.log(transdata)
  }

  async function UserData(id) {
    return await fetch(`https://eco-finance-backend.herokuapp.com/api/txn?userId=${id}`, {
      "method" : "GET",
      headers: {"Content-Type" :'application/json'}
    })
    .then(response => response.json())
  }

  async function retrieveid () {
    return await fetch('https://eco-finance-backend.herokuapp.com/api/login', {
      method: 'POST',
      headers: {"Content-Type" :'application/json'},
      body: localStorage.getItem('user')
    })
    .then((response) => response.json())
    .then(data => data.userId)
  }

  

  return (
    <Table
      columns={columns}
      data={data}
      UserData={UserData}
      retrieveid={retrieveid}
      populateTransactions={populateTransactions}
    />
  )
}

export default Transactions;
