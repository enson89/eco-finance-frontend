import React from 'react'
import { useTable } from 'react-table'


const getPrice = (value) => {
  //Placeholder for price check with Api call
  return ("Sam")
}

const getRating = (value) => {
  //Placeholder for database check 
  //If database check returns negative, call api and record in database
  return ("Ple")
}

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  addRow,
  updateMyData, 
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    if(!!e.target.value){
      setValue(e.target.value)
      addRow(index)
      updateMyData(index, value)
    }
    else {return}
  }

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

const IneditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} readOnly={true} />
}

function Table({ columns, data, updateMyData, addRow }) {
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
      updateMyData,
      addRow
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

function Portfolio() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Ticker',
        accessor: 'ticker',
        Cell: EditableCell
      },
      {
        Header: 'Price',
        accessor: 'stockPrice',
        Cell: IneditableCell
      },
      {
        Header: 'ESG Rating',
        accessor: 'stockRating',
        Cell: IneditableCell
      }
    ],
    []
  )

  const [data, setData] = React.useState(React.useMemo(
    () => [
      { ticker: 'Enter', stockPrice: "Null", stockRating: "Null" }
    ], []))
  const [defaultRow] = React.useState(data)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const addRow = (index) => {
    if (data.length == index+1){
      const updatedRows = [...data, defaultRow]
      setData(updatedRows)
    }
  }

  const updateMyData = (rowIndex, value) => {
    // We also turn on the flag to not reset the page
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            ['ticker']: value,
            ['stockPrice']: getPrice(value),
            ['stockRating']: getRating(value),
          }
        }
        return row
      })
    )
  }


  return (
    <Table
      columns={columns}
      data={data}
      updateMyData={updateMyData}
      addRow={addRow}
    />
  )
}

export default Portfolio