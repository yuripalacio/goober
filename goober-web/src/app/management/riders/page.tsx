'use client'

import { api } from '@/data/api'
import { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

type DataRow = {
  id: string
  startPoint: string
  destination: string
  status: string
}

const columns: TableColumn<DataRow>[] = [
  {
    name: 'ID',
    selector: (row) => row.id,
  },
  {
    name: 'PickUp',
    selector: (row) => row.startPoint,
  },
  {
    name: 'DropOff',
    selector: (row) => row.destination,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
  },
]

export default function ManagementRiders() {
  const [data, setData] = useState([])

  useEffect(() => {
    api('/trips/all')
      .then((response) => response.json())
      .then(({ trips }) => {
        setData(trips)
      })
  }, [])

  // const data = [
  //   {
  //     title: 'Yuri',
  //     director: 'IT',
  //     year: '1993',
  //   },
  // ]
  return <DataTable columns={columns} data={data} pagination />
}
