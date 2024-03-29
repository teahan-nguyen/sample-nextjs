import { Button as ButtonAnt } from 'antd'
import Link from 'next/link'
import { ButtonProps } from './types'
import { cn } from '@/lib/tailwind/utils'

export default function Button({
  children,
  size = 'M',
  disabled = false,
  loading = false,
  htmlType = 'button',
  icon,
  type = 'Primary',
  className,
  href,
  onClick,
  block,
  width,
  isActive,
  id,
  ...rest
}: ButtonProps) {
  const button = (
    <ButtonAnt
      {...rest}
      style={width ? { width } : undefined}
      block={block}
      onClick={onClick}
      className={cn(
        ``,
        type === 'Secondary' && 'ant-btn-secondary',
        type === 'Tertiary' && 'ant-btn-tertiary',
        type === 'PrimaryDanger' && 'ant-btn-primarydanger',
        type === 'SecondaryDanger' && 'ant-btn-secondarydanger',
        type === 'TextDanger' && 'ant-btn-textdanger',
        isActive && type === 'Primary' && 'ant-btn-primary-active',
        className
      )}
      id={id}
      loading={loading}
      disabled={disabled}
      size={size === 'L' ? 'large' : size === 'M' ? 'middle' : size === 'S' ? 'small' : 'large'}
      htmlType={htmlType}
      icon={icon}
      type={
        type === 'Primary'
          ? 'primary'
          : type === 'PrimaryDanger'
            ? 'primary'
            : type === 'Secondary'
              ? 'default'
              : type === 'SecondaryDanger'
                ? 'default'
                : type === 'Link'
                  ? 'link'
                  : type === 'Text'
                    ? 'text'
                    : type === 'TextDanger'
                      ? 'text'
                      : type === 'Tertiary'
                        ? 'default'
                        : 'primary'
      }
    >
      {children}
    </ButtonAnt>
  )

  if (href) {
    return <Link href={href}>{button}</Link>
  }

  return button
}
