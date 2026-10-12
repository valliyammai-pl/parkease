import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ParkingPage } from '../pages/ParkingPage';
import { ParkingDetailsPage } from '../pages/ParkingDetailsPage';
import { BookingPage } from '../pages/BookingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FastagPage } from '../pages/FastagPage';
import { InsurancePage } from '../pages/InsurancePage';
import { EvChargingPage } from '../pages/EvChargingPage';
import { ServicesPage } from '../pages/ServicesPage';
import { VehiclesPage } from '../pages/VehiclesPage';
import { NotificationsPage } from '../pages/NotificationsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/parking/:id" element={<ParkingDetailsPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/fastag" element={<FastagPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/ev-charging" element={<EvChargingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <VehiclesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
