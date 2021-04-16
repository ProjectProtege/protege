import { useMemo } from 'react'
import { useTable } from 'react-table'
import { useJobs } from 'store/jobs_store'
import getText from 'utils/i18n/Texts'

function Table({ columns, data, getCellProps }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()} className='w-full'>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className='grid grid-cols-5 gap-4 p-4'
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className='hidden text-sm font-normal text-left text-gray-600 lg:block'
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className='flex flex-col space-y-3'>
        {rows.map((row, i) => {
          prepareRow(row)

          return (
            <tr
              {...row.getRowProps()}
              className='grid items-center gap-4 p-4 text-sm bg-white border-l-4 border-teal-500 rounded shadow cursor-pointer md:grid-cols-5 grid-row-4'
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                      },
                      getCellProps(cell),
                    ])}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const JobList = () => {
  const jobs = useJobs((s) => s.jobs)

  const columns = useMemo(
    () => [
      {
        Header: getText('GLOBAL', 'TABLE_TITLE'),
        accessor: 'jobTitle',
        className: 'font-bold  md:col-span-2',
      },
      {
        Header: getText('GLOBAL', 'TABLE_COMPANY'),
        accessor: 'companyName',
        className: 'text-gray-600',
      },
      {
        Header: getText('GLOBAL', 'TABLE_DATE'),
        accessor: 'dateApplied',
        className: 'text-gray-600',
      },
      {
        Header: getText('GLOBAL', 'TABLE_STATUS'),
        accessor: 'status',
        className: 'uppercase text-right',
      },
    ],
    []
  )

  return (
    <Table
      columns={columns}
      data={jobs}
      getCellProps={(cell) => ({
        className: `${
          cell.value === 'viewed' ? 'text-teal-500' : 'text-black'
        }`,
      })}
    />
  )
}

export default JobList
