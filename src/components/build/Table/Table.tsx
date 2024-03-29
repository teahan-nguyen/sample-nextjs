import { Table as TableAntLib } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { isEmpty, isFunction } from 'lodash'
import { MouseEventHandler, ReactNode, useMemo } from 'react'
import ThSort from './ThSort'

import Image from 'next/image'
import { CUSTOM_BREAKPOINTS } from '@/constants'
import { cn } from '@/lib/tailwind/utils'
import { SortValue, SortValueAscDesc } from './types'
import { KeyOf } from '@/components/svgs/types'
import useWindowSize from '@/hooks/useWindowSize'

type HeaderColumnWidth = {
  xs: number | undefined
  sm: number | undefined
  md: number | undefined
  lg: number | undefined
  xl: number | undefined
  xxl: number | undefined
  xxxl: number | undefined
}

interface CommonHeader {
  text: string
  className?: string
  width?: HeaderColumnWidth
  isActionColumn?: boolean
  isDateColumn?: boolean
}
interface ColumSort extends CommonHeader {
  isSort: true
  onClickSortAsc: MouseEventHandler
  onClickSortDesc: MouseEventHandler
  sortKey: string
  activeSortKey: string
  sortValue: SortValue | SortValueAscDesc
}
interface ColumnNonSort extends CommonHeader {
  isSort: false
}

export type HeaderColumnType = ColumSort | ColumnNonSort

export type BodyColumnType<DataType> = {
  render?: (dataRow: any, row: DataType) => ReactNode
  renderKey: KeyOf<DataType>
  isDisableCellClick?: boolean
  tdClassName?: string
  maxLength?: number
  dataTestid?: string
}

interface TableProps<DataType> {
  className?: string
  isLoading: boolean
  dataSource: DataType[]
  headerColumns: HeaderColumnType[]
  bodyColumns: BodyColumnType<DataType>[]
  idKey: KeyOf<DataType>
  onRowClick?: (id: any) => void
  checkIsDisableRowClick?: (row: any) => boolean
  minWidth?: number
  isNotTruncate?: boolean
  createNewButton?: ReactNode
}

function Table<DataType>({
  isLoading,
  dataSource,
  headerColumns,
  bodyColumns,
  idKey,
  onRowClick,
  checkIsDisableRowClick = () => {
    return false
  },
  className,
  isNotTruncate = false,
  createNewButton,
}: TableProps<DataType>) {
  const windowSize = useWindowSize()
  const windowWidth = useMemo(() => {
    return windowSize.width || 0
  }, [windowSize])

  const isBelowXl = useMemo(() => {
    return windowWidth < CUSTOM_BREAKPOINTS.xl
  }, [windowWidth])

  const scroll = useMemo(() => {
    if (isBelowXl) {
      return {
        x: 'max-content',
        y: 500,
      }
    }

    return {
      x: '100%',
      // x: undefined,
      // x: "max-content",
      y: isBelowXl ? 500 : undefined,
    }
  }, [isBelowXl])

  const columns: ColumnsType<DataType> = useMemo(() => {
    const result: ColumnsType<DataType> = []

    for (let i = 0; i < headerColumns.length; i++) {
      const headerItem = headerColumns[i]
      const bodyItem = bodyColumns[i]
      const key = bodyItem.renderKey
      const getTextNode = (className: string) => (
        <div
          className={cn(
            `text-[14px] leading-[24px] text-neutral-1-9 font-semibold`, // thead tr th div
            !isNotTruncate && 'truncate',
            headerItem.className,
            className
          )}
        >
          {headerItem.text}
        </div>
      )
      result.push({
        className: cn(
          'max-w-[200px]', //  tr > td, tr > th
          !isNotTruncate && 'truncate',
          headerItem.isActionColumn ? 'min-w-[80px]' : 'min-w-[100px]',
          headerItem.className,
          bodyItem.tdClassName
        ),

        ellipsis: !isNotTruncate,
        key: key,
        dataIndex: key,
        // width: isBelowXl ? undefined : headerItem.width,
        // width: undefined,
        width: (() => {
          if (headerItem.isActionColumn) {
            return 80
          }

          if (headerItem.isDateColumn) {
            return 170
          }
          if (!headerItem.width) {
            return undefined
          }

          // if (isBelowXl) {
          //   return undefined
          // }

          let key: keyof HeaderColumnWidth = 'xs'
          if (windowWidth < CUSTOM_BREAKPOINTS.sm) {
            key = 'xs'
          } else if (windowWidth < CUSTOM_BREAKPOINTS.md) {
            key = 'sm'
          } else if (windowWidth < CUSTOM_BREAKPOINTS.lg) {
            key = 'md'
          } else if (windowWidth < CUSTOM_BREAKPOINTS.xl) {
            key = 'lg'
          } else if (windowWidth < CUSTOM_BREAKPOINTS.xxl) {
            key = 'xl'
          } else if (windowWidth < CUSTOM_BREAKPOINTS.xxxl) {
            key = 'xxl'
          } else {
            key = 'xxxl'
          }

          const target = headerItem.width[key]
          return target
        })(),

        title: !headerItem.isSort ? (
          getTextNode('p-3')
        ) : (
          <ThSort
            sortKey={headerItem.sortKey}
            activeSortKey={headerItem.activeSortKey}
            sortValue={headerItem.sortValue}
            onClickSortAsc={headerItem.onClickSortAsc}
            onClickSortDesc={headerItem.onClickSortDesc}
            textNode={getTextNode('')}
          />
        ),
        // @ts-ignore: Unreachable code error
        render: (() => {
          if (isLoading) {
            return function TableLoading() {
              return <div className="transition rounded h-8">...</div>
            }
          }

          if (bodyItem.render) {
            return function CustomCell(value, record) {
              return bodyItem.render!(value, record)
            }
          }

          return function CellEmpty(value) {
            return <>{value || ''}</>
          }
        })(),
        onCell: () => {
          return {
            ['data-testid' as string]: bodyItem.dataTestid ?? bodyItem.renderKey,
          }
        },
      })
    }

    return result
  }, [headerColumns, bodyColumns, isLoading, windowWidth, isNotTruncate])

  return (
    <TableAntLib
      locale={{
        emptyText: () => {
          return (
            <div className="h-[277px] flex justify-center items-center">
              <div>
                <Image
                  className=" mx-auto mb-2"
                  width={122}
                  height={120}
                  src={'/assets/images/Empty_Folder.png'}
                  alt=""
                />
                <div className="font-medium text-[14px] leading-[20px] text-neutral-1-9 mb-4">
                  No results were found.
                </div>
                {createNewButton}
              </div>
            </div>
          )
        },
      }}
      rowKey={(record) => {
        return record?.[idKey] || idKey
      }}
      tableLayout="fixed"
      className={cn(
        `ant-infosectable min-h-[260px] bg-white max-lg:shadow-tablecontainer`,
        dataSource.length === 1 && 'pb147',
        dataSource.length === 2 && 'pb98',
        dataSource.length === 3 && 'pb49',
        className
      )}
      columns={columns as any}
      dataSource={
        (isEmpty(dataSource) && isLoading
          ? [
              { [idKey]: '1' },
              { [idKey]: '2' },
              { [idKey]: '3' },
              { [idKey]: '4' },
              { [idKey]: '5' },
              { [idKey]: '6' },
            ]
          : dataSource) as any
      }
      pagination={false}
      scroll={scroll}
      loading={false}
      onRow={(record) => {
        return {
          onClick: () => {
            if (checkIsDisableRowClick(record)) {
              return
            }
            if (isFunction(onRowClick)) {
              onRowClick(record[idKey])
            }
          },
        }
      }}
      rowClassName={(record) => {
        return cn(
          !isNotTruncate && 'truncate', // tbody > tr
          !checkIsDisableRowClick(record) && isFunction(onRowClick) && 'cursor-pointer'
        )
      }}
    />
  )
}

export default Table
