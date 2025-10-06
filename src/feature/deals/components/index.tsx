"use client";
import React from 'react';
import { DealsHeader } from './Deals-Header';
import { Table, TableColumn, Badge } from '@/components/ui/Table';
import { dealsData, DealData } from '../libs/DealsData';
import GridView from './DealsGridView'
import DealDetail from './DealDetail'

const columns: TableColumn<DealData>[] = [
  { key: 'dealName', title: 'Deal Name', dataIndex: 'dealName', sortable: true },
  { key: 'company', title: 'Company', dataIndex: 'company', sortable: false },
  { key: 'contact', title: 'Contact', dataIndex: 'contact', sortable: false },
  { key: 'stage', title: 'Stage', dataIndex: 'stage', sortable: false, render: (stage) => <Badge variant={stage as any}>{stage}</Badge> },
  { key: 'amount', title: 'Amount', dataIndex: 'amount', sortable: false, render: (amount) => `€${amount.toLocaleString()}` },
  { key: 'owner', title: 'Owner', dataIndex: 'owner', sortable: false, avatar: { srcIndex: 'ownerImage', altIndex: 'owner', size: 32 } },
  { key: 'date', title: 'Closed Date', dataIndex: 'date', sortable: false },
  { key: 'activity', title: 'Last Activity', dataIndex: 'activity', sortable: false },
  { key: 'tags', title: 'Tags', dataIndex: 'tags', sortable: false },


];

const Deals = () => {
  const [view, setView] = React.useState<'table' | 'grid'>('table');
  const [selectedDeal, setSelectedDeal] = React.useState<DealData | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)

  const openDetail = (deal: DealData) => {
    setSelectedDeal(deal)
    setIsDetailOpen(true)
  }
  const closeDetail = () => {
    setIsDetailOpen(false)
    setSelectedDeal(null)
  }
  return (
   <div className='overflow-x-hidden'>
    <DealsHeader view={view} setView={(view: 'table' | 'grid') => setView(view)} />
    <div className='py-8 px-6 overflow-x-hidden'>
     
        {view === 'table' ? (
          <>
            <Table 
              columns={columns} 
              data={dealsData} 
              selectable={true}
              onRowClick={(record) => openDetail(record as DealData)}
            />
            <DealDetail 
              isOpen={isDetailOpen}
              deal={selectedDeal}
              onClose={closeDetail}
              onDelete={(id) => {
                closeDetail()
              }}
              onEdit={() => {}}
              onAddNotes={() => {}}
              onExport={() => {}}
            />
          </>
        ) : (
          <GridView  />
        )}
      </div>
    </div>

  );
};

export default Deals;
