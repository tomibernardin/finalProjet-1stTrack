// import { useState } from 'react'
import { Auth, Home, Product } from './views'
import { RouteNotFound } from './utilities/RouteNotFound'
import { AuthGuard } from './guard/AuthGuard'
import { Route } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes } from './guard/Routes'
import { Reserve } from './views/reserve/Reserve'
import { VerifyConfirmation } from './views/verify-confirmation/VerifyConfirmation'
import { DefaultError } from './views/defaultError/DefaultError'
import { UserReservations } from './views/userProfile/userReservations/UserReservations'
import { ProductCreate } from './views/productCreate/ProductCreate'
import { UserProducts } from './views/userProfile/userProducts/UserProducts'
import { ProductEdit } from './views/productEdit/ProductEdit'
import './App.css'

function App() {
  return (
    <RouteNotFound>
      <Route path={PublicRoutes.HOME} element={<Home />} />
      <Route path={PublicRoutes.AUTH} element={<Auth />} />
      <Route path={PublicRoutes.PRODUCT} element={<Product />} />
      <Route path={PublicRoutes.VERIFYCONFIRM} element={<VerifyConfirmation />} />
      <Route path={PublicRoutes.DEFAULTERROR} element={<DefaultError />} />

      <Route element={<AuthGuard />}>
        <Route path={PrivateRoutes.PRODUCTCREATE} element={<ProductCreate />} />
        <Route path={PrivateRoutes.PRODUCTEDIT} element={<ProductEdit />} />
        <Route path={PrivateRoutes.RESERVE} element={<Reserve />} />
        <Route path={PrivateRoutes.USERRESERVATIONS} element={<UserReservations />} />
        <Route path={PrivateRoutes.USERPRODUCTS} element={<UserProducts />} />
      </Route>
  </RouteNotFound>
  )
}

export default App
