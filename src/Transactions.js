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

function Table({ columns, data}) {
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
  //    UserData
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
        accessor: 'ticker',
        Cell: IneditableCell
      },
      {
        Header: 'Type',
        accessor: 'transType',
        Cell: IneditableCell
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        Cell: IneditableCell
      },
    ],
    []
  )

  const [data,setData] = React.useState(React.useMemo(
    () => [
      {ticker : 'AABB', transType: 'Buy', quantity: '2000'}
    ],[]))

  // const UserData = async (id) => {
  //  const transacdata = await fetch(``, {
  //    "method":"GET"
  //  }
  //  .then(response => response.json)
  //   const [data,setData] = React.useState(React.useMemo(
  //     () => [
  //       {ticker : 'AABB', transType: 'Buy', quantity: '2000'}
  //     ],[]))
  // }

  // async function retrieveid () {
  //   return await fetch('https://eco-finance-backend.herokuapp.com/api/login', {
  //     method: 'POST',
  //     headers: {"Content-Type" :'application/json'},
  //     body: localStorage.getItem('user')
  //   })
  //   .then((response) => response.json().userId)
  // }

  return (
    <Table
      columns={columns}
      data={data}
    //  UserData={UserData}
    />
  )
}

export default Transactions;
