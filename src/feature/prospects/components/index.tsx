"use client"
import React from 'react'
import { Table } from '@/components/ui/Table';

import { ProspectHeader } from './ProspectHeader'
import { prospectsData } from '../libs/prospectsdata'
import { TableColumn } from '@/components/ui/Table'
import { Contact } from '../types/types'
import ProspectDetail from './ProspectDetail'

export const prospectsColumns: TableColumn<Contact>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'company',
    title: 'Company',
    dataIndex: 'company',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: false,
  },
  {
    key: 'phone',
    title: 'Phone',
    dataIndex: 'phone',
    sortable: false,
  },
  {
    key: 'owner',
    title: 'Owner',
    dataIndex: 'owner',
    avatar: { srcIndex: 'ownerAvatar', altIndex: 'owner', size: 32 },
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
  render: (status?: Contact['status']) => {
  const cls: Record<NonNullable<Contact['status']>, string> = {
    New: 'bg-[#E4E4E7] text-[#3F3F46]',
    Cold: 'bg-[#DBEAFE] text-[#1D4ED8]',
    'Warm Lead': 'bg-[#FEF3C7] text-[#92400E]',
    Qualified: 'bg-green-100 text-green-700',
    Converted: 'bg-teal-100 text-teal-700',
    'Not Interested': 'bg-[#FEE2E2] text-[#B91C1C]',
  };

  const classes = status ? cls[status] : 'bg-gray-100 text-gray-500'; 

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${classes}`}>
      {status ?? 'Unknown'}
    </span>
  );
},

  },
  {
    key: 'lastContact',
    title: 'Last Contact',
    dataIndex: 'lastContact',
    sortable: true,
  },
  {
    key: 'tags',
    title: 'Tags',
    dataIndex: 'tags',
    sortable: false,
  },
]

export default function Prospects () {
  const [selected, setSelected] = React.useState<Contact | null>(null)
  const [open, setOpen] = React.useState(false)

  const openDetail = (c: Contact) => { setSelected(c); setOpen(true) }
  const closeDetail = () => { setOpen(false); setSelected(null) }

  return (
    <div className='overflow-x-hidden'>
      <ProspectHeader/>
       <div className='py-8 px-6 overflow-x-hidden'>
          <Table 
            columns={prospectsColumns} 
            data={prospectsData} 
            selectable={true}
            onRowClick={(record) => openDetail(record as Contact)}
          />
          <ProspectDetail 
            isOpen={open}
            contact={selected}
            onClose={closeDetail}
            onDelete={(id: string) => {
              // Handle delete logic here
              console.log('Delete prospect:', id);
              closeDetail();
            }}
            onEdit={(id: string) => {
              // Handle edit logic here
              console.log('Edit prospect:', id);
            }}
            onAddNotes={(id: string) => {
              // Handle add notes logic here
              console.log('Add notes for prospect:', id);
            }}
            onExport={(id: string) => {
              // Handle export logic here
              console.log('Export prospect:', id);
            }}
          />
        </div>
      </div>
  )
}
