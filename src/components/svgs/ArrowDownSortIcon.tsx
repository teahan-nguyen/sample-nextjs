import { SvgIconConstituentValues } from './types'

export default function ArrowDownSortIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      {...props}
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.332 1.49982V12.4998M15.332 12.4998L12.832 9.74982M15.332 12.4998L17.832 9.74982"
        stroke={props.fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.33203 1.99976H4.33203M10.5187 5.49976H7.08203H2.33203M12.332 1.99976H2.33203M4.29688 12.1333H2.29688M7.92891 8.84767L2.42891 8.84767"
        stroke={props.fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
