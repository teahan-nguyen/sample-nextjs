export const CUSTOM_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  xxl: 1536,
  xxxl: 1880,
  '3xl': 1880,
}

const getAppCRUDRoutes = (base: string) => {
  return {
    list: base,
    detail: (id: string) => `${base}/${id}`,
    create: `${base}/create`,
    edit: (id: string) => `${base}/${id}/edit`,
  }
}

export const APP_ROUTES = {
  home: '/',
  userProfile: '/user-profile',
  login: '/login',
  posts: getAppCRUDRoutes('/posts'),
}

export const API_ROUTES = {
  posts: {
    list: '/posts',
    detail: (id: string) => `/post/${id}`,
    create: '/posts/create',
    delete: (id: string) => `/posts/${id}`,
    edit: (id: string) => `/posts/${id}`,
  },
}

export const REACT_QUERY_KEYS = {
  posts: {
    list: 'LIST_POST',
    detail: 'POST_BY_ID',
  },
}
