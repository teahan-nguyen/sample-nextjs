import React, { MouseEventHandler, ReactNode, useMemo } from 'react'

import { cn } from '@/lib/tailwind/utils'
import { ArrowDownSortIcon } from '@/components/svgs'
import { SortValue, SortValueAscDesc } from './types'

interface ThSortProps {
  onClickSortAsc: MouseEventHandler
  onClickSortDesc: MouseEventHandler
  textNode: ReactNode
  sortValue: SortValue | SortValueAscDesc
  sortKey: string
  activeSortKey: string
}

const ThSort: React.FC<ThSortProps> = ({
  sortKey,
  activeSortKey,
  sortValue,
  onClickSortAsc,
  onClickSortDesc,
  textNode,
}) => {
  const isActive = useMemo(() => {
    return sortKey === activeSortKey
  }, [sortKey, activeSortKey])

  const sortAsc = useMemo(() => {
    return sortValue === SortValueAscDesc.asc || sortValue === SortValue.asc
  }, [sortValue])

  const sortDesc = useMemo(() => {
    return sortValue === SortValueAscDesc.desc || sortValue === SortValue.desc
  }, [sortValue])

  const onClick = useMemo(() => {
    if (!sortValue || !onClickSortAsc || !onClickSortDesc) {
      return undefined
    }
    if (sortAsc) {
      return onClickSortDesc
    } else if (sortDesc) {
      return onClickSortAsc
    }
  }, [sortValue, onClickSortAsc, onClickSortDesc, sortAsc, sortDesc])

  return (
    <div
      onClick={onClick}
      className="p-3 cursor-pointer flex justify-between items-center gap-x-4"
    >
      {textNode}
      <div className="w-6 h-6 justify-center items-center flex hover:bg-[#eee] transition rounded">
        <ArrowDownSortIcon
          className={cn(
            ` cursor-pointer duration-200 flex-shrink-0 `,
            sortAsc ? ' rotate-180 ' : '  ',
            isActive ? 'fill-primary ' : 'fill-[#6a6a6a]'
          )}
          fill={isActive ? '#1D92FF' : '#6a6a6a'}
        />
      </div>
    </div>
  )
}

export default ThSort
