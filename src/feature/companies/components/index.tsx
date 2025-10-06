"use client"
import React from 'react'
import { Table, TableColumn } from '@/components/ui/Table';
import { Companie } from '../types/types';
import { companiesData } from '../libs/companiesData';
import { CompaniesHeader } from './CompaniesHeader';
import CompanieDetail from './CompanieDetail';

export const customerColumns: TableColumn<Companie>[] = [
    {
      key: 'companyname',
      title: 'Company Name',
      dataIndex: 'companyname',
      sortable: true,
    },
  {
    key: 'industry',
    title: ' Industry',
    dataIndex: 'industry',
    sortable: false,
  },
  {
    key: 'website',
    title: ' Website',
    dataIndex: 'website',
    sortable: false,
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
  render: (status?: Companie['status']) => {
  const cls: Record<NonNullable<Companie['status']>, string> = {
    Active: 'bg-green-100 text-green-700',
    'Follow Up': 'bg-[#FEF3C7] text-[#92400E]',
    'inactive': 'bg-[#FEE2E2] text-[#B91C1C]',
 
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


export default function Companies () {
  const [selected, setSelected] = React.useState<Companie | null>(null)
  const [open, setOpen] = React.useState(false)

  const openDetail = (c: Companie) => { setSelected(c); setOpen(true) }
  const closeDetail = () => { setOpen(false); setSelected(null) }

  return (
    <div className='overflow-x-hidden'>
      <CompaniesHeader/>
 <div className='py-8 px-6 overflow-x-hidden'>
             
                <Table 
                  columns={customerColumns} 
                  data={companiesData} 
                  selectable={true}
                  onRowClick={(record) => openDetail(record as Companie)}
                />
                <CompanieDetail 
                  isOpen={open}
                  company={selected}
                  onClose={closeDetail}
                  onDelete={(id: string) => {
                    // Handle delete logic here
                    console.log('Delete company:', id);
                    closeDetail();
                  }}
                  onEdit={(id: string) => {
                    // Handle edit logic here
                    console.log('Edit company:', id);
                  }}
                  onAddNotes={(id: string) => {
                    // Handle add notes logic here
                    console.log('Add notes for company:', id);
                  }}
                  onExport={(id: string) => {
                    // Handle export logic here
                    console.log('Export company:', id);
                  }}
                />
            </div>
          </div>
  )
}

