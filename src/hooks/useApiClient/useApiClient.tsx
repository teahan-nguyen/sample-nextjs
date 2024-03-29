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

'use client'

import { env } from '@/env'
import axios from 'axios'
import { get } from 'lodash'
import { useSession } from 'next-auth/react'
import querystring from 'query-string'
import { useMemo } from 'react'

/**
 * Axios instance for browser,
 * with `access-token` header injected
 */

export default function useApiClient() {
  const session = useSession()

  const apiClient = useMemo(() => {
    const instance = axios.create({
      baseURL: env.NEXT_PUBLIC_API_URL,
      headers: {
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-type': 'application/json',
        'XSRF-TOKEN': 'csrfToken',
      },
      paramsSerializer: (param) => querystring.stringify(param),
      timeout: 15000,
    })

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const err = get(error, 'response')

        // Check if the request is actually reached API server
        if (error.code === 'ECONNABORTED' || err === undefined) {
          return Promise.reject(
            'An unexpected error occurred, the server cannot response properly at the moment, please try again later.'
          )
        }

        return Promise.reject(err.data)
      }
    )

    instance.interceptors.request.use(async (config) => {
      const controller = new AbortController()

      if (session.data === null || session.data === undefined) {
        controller.abort('Abort request because user have not been authenticated.')
      } else {
        config.headers.Authorization = `${session.data.user.accessToken}`.trim()
      }

      config.url = decodeURI(encodeURI(config.url || '').replace(/%E2%80%8B/g, ''))

      return {
        ...config,
        signal: controller.signal,
      }
    })

    return instance
  }, [session.data])

  return apiClient
}
