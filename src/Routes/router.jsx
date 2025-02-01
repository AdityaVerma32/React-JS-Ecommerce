import React from 'react'
import ProductListing from '../Pages/ProductListing.jsx'
import Layout from '../Layouts/Layout.jsx'
import ProductDetailsPage from '../Pages/ProductDetailsPage.jsx'
import LoginPage from '../Pages/LoginPage.jsx'
import RegistrationPage from '../Pages/RegistrationPage.jsx'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage.jsx'
import CartPage from '../Pages/CartPage.jsx'
import ProtectedRoute from '../Utils/ProtectedRoute.jsx'
import ShippingDetails from '../Pages/ShippingDetails.jsx'
import PaymentSuccess from '../Pages/PaymentSuccess.jsx'
import OrderConfirmation from '../Pages/OrderConfirmation.jsx'
import AdminDashboard from '../Pages/AdminDashboard.jsx'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<ProductListing />} />
        <Route path='/product/:id' element={<ProductDetailsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/page-not-found' element={<ErrorPage />} />
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>

        <Route
          path='/cart' element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/order-confirm' element={
            <ProtectedRoute>
              < OrderConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path='/payment-Success' element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path='/shipping-address' element={
            <ProtectedRoute>
              <ShippingDetails />
            </ProtectedRoute>
          }
        />

      </Route>
    </React.Fragment>
  )
)



