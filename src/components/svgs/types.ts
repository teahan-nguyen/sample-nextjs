// THIS SOURCE CODE IS THE INTELLECTUAL PROPERTY OF INFOSEC GLOBAL, INC. This
// source code cannot be copied, modified, printed, reproduced or used in any
// way, shape or form without prior permission from InfoSec Global, Inc. ANY
// ATTEMPTS TO COPY, MODIFY, PRINT, REPRODUCE OR USE THIS SOURCE CODE WITHOUT
// PERMISSION FROM INFOSEC GLOBAL, INC. ARE STRICTLY PROHIBITED.
// Anyone creating, updating, or viewing this source code in any way, shape
// or form is bound by this copyright message, including Infosec Global, Inc
// employees, contractors, partners, or any other associated or non-associated
// person, entity or a system.
// Copyright 2023 Infosec Global, Inc., All rights reserved.

import { MouseEventHandler } from 'react'

export enum LANGUAGE {
  EN_UK = 'English (UK)',
  EN_US = 'English (US)',
}

export type INPUT_TYPE = 'text' | 'password' | 'email' | 'tel'
export type AUTO_COMPLETE_MODE = 'on' | 'off' | 'new-password' | 'no-autofill'

export interface SvgIconConstituentValues {
  strokeColor?: string
  strokeWidth?: string
  strokeWidth2?: string
  strokeWidth3?: string
  strokeFill?: string
  fillColor?: string
  fillColor2?: string
  fillColor3?: string
  fillColor4?: string
  fillColor5?: string
  fillColor6?: string
  fillColor7?: string
  imageWidth?: string
  imageHeight?: string
  width?: string
  height?: string
  rotateCenter?: number
  className?: string
  classname2?: string
  classname3?: string
  classname4?: string
  classname5?: string
  viewBox?: string
  fill?: string
  customercolor2?: string
  onClick?: MouseEventHandler
}

export interface ISVGWithHoverAndActiveState {
  hover?: boolean
  active?: boolean
}

export enum SortValue {
  'asc' = '1',
  'desc' = '-1',
}

export enum SortValueAscDesc {
  'asc' = 'asc',
  'desc' = 'desc',
}

export type KeyOf<T> = Extract<keyof T, string>

export type SortState<DataType extends string> = {
  [key in DataType]: SortValue
}

export type SortStateAscDesc<DataType extends string> = {
  [key in DataType]: SortValueAscDesc
}

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property]
}
export type Falsey = false | null | undefined | 0 | ''

export type generalCallbackFunction = (...args: any[]) => void
