import React from 'react'
import ProductListing from '../Pages/ProductListing.jsx'
import Layout from '../Layouts/Layout.jsx'
import ProductDetailsPage from '../Pages/ProductDetailsPage.jsx'
import LoginPage from '../Pages/LoginPage.jsx'
import RegistrationPage from '../Pages/RegistrationPage.jsx'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage.jsx'
import CartPage from '../Pages/CartPage.jsx'
import ProtectedRoute from '../Components/ProtectedRoute.jsx'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<ProductListing />} />
        <Route path='/product/:id' element={<ProductDetailsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/page-not-found' element={<ErrorPage />} />
        <Route
          path='/cart' element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

      </Route>
    </React.Fragment>
  )
)



