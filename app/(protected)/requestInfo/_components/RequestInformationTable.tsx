'use client'
import React from 'react'
import { useRequestInfoQuery } from '../_hooks/requestInfohooks';
import { DataTable } from '@/components/data-table';
import { requestInformationColumns } from './Headers';

function RequestInformationTable() {
    
    const { data: requestInformationData, isPending } = useRequestInfoQuery(1,10)

    if(isPending){
        return(<h1>Loading....</h1>)
    }

  return (
    <div>
        {
          requestInformationData?.data?.length > 0 &&
        <DataTable columns={requestInformationColumns} data={requestInformationData?.data} />
        }
    </div>
  )
}

export default RequestInformationTable
