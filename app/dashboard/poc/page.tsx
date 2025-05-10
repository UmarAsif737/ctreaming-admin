'use client'

import React, { useState, useEffect } from 'react'
import Error from '@/components/error'
import { IMeta } from '@/helpers/types'
import { getAllPocs } from '@/actions/poc-actions'
import { POCS } from '@/components/pocs'

const defaultMeta: IMeta = {
  current_page: 1,
  page_items: 0,
  total_items: 0,
  total_pages: 1
}

const PocPage = ({
  searchParams
}: {
  searchParams: { page?: number, limit?: number, query?: string }
}) => {
  const [data, setData] = useState <[]|any > ([])
  const [meta, setMeta] = useState < IMeta > (defaultMeta)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // FETCH POCS!
  const fetchPocs = async (params: {
    page?: number;
    limit?: number;
    query?: string;
    search?: string;
  } = { page: 1, limit: 10, query: '', search: '' }) => {
    setLoading(true)
    const { error, data: pocsData, meta: pocsMeta } = await getAllPocs(params)
    if (error) {
      setData([])
      setMeta(defaultMeta)
    } else {
      setData(pocsData || [])
      setMeta(pocsMeta || defaultMeta)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPocs({
      page: searchParams.page,
      limit: searchParams.limit,
      search: searchTerm || ''
    })
  }, [searchParams.page, searchParams.limit, searchTerm])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  if (!meta) return <Error error={'No Data Found'} />

  return (
    <POCS
      data={data}
      meta={meta}
      loading={loading}
      onSearch={handleSearch}
      refreshData={fetchPocs}
    />
  )
}

export default PocPage
