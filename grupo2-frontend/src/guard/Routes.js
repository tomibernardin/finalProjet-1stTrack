export const PublicRoutes = {
    HOME : '/',
    LOGIN : '/auth/signin',
    REGISTER : '/auth/signup',
    AUTH : '/auth/*',
    PRODUCT: '/product/:id',
    VERIFYCONFIRM : '/verify-confirmation',
    DEFAULTERROR: '/bad-request'
}

export const PrivateRoutes = {
    RESERVE : '/product/:id/reserve',
    RESERVEID: (id) => `/product/${id}/reserve`,
    USERRESERVATIONS: '/reservation/user/:id',
    USERRESERVATIONSID: (id) => `/reservation/user/${id}`,
    PRODUCTCREATE: '/product/create',
    PRODUCTEDIT: '/product/edit/:id',
    PRODUCTEDITID: (id) => `/product/edit/${id}`,
    USERPRODUCTS: '/product/user/:id',
    USERPRODUCTSID: (id) => `/product/user/${id}`,
}

export const FetchRoutes = {
  // BASEURL : 'https://backend.nomadapp.com.ar/v1',
  BASEURL : 'http://localhost:8080',
  API  : 'ip-10-0-10-20.us-east-2.compute.internal:8080/v1/',
  BUCKET : 'https://s3-0222ftc1-grupo2-frontend.s3.us-east-2.amazonaws.com'
}
  