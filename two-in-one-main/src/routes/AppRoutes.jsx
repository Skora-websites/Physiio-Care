import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProtectedRoute from '../components/ProtectedRoute';

// Admin Pages
import AdminLogin from '../admin/pages/Login';
import AdminDashboard from '../admin/pages/Dashboard';
import AdminOverview from '../admin/pages/Overview';
import AdminLeads from '../admin/pages/Leads';
import AdminProtectedRoute from '../admin/components/AdminProtectedRoute';

// Admin Doctor CRUD
import DoctorSettings from '../admin/pages/DoctorSettings';
import DoctorServicesAdmin from '../admin/pages/DoctorServices';
import DoctorGalleryAdmin from '../admin/pages/DoctorGallery';
import VideoShowcaseAdmin from '../admin/pages/VideoShowcaseAdmin';
import VideosGalleryAdmin from '../admin/pages/VideosGalleryAdmin';

// Admin Play Zone CRUD
import PlayZoneSettings from '../admin/pages/PlayZoneSettings';
import PlayZoneActivitiesAdmin from '../admin/pages/PlayZoneActivities';
import PlayZoneServicesAdmin from '../admin/pages/PlayZoneServices';
import PlayZoneGalleryAdmin from '../admin/pages/PlayZoneGallery';

// Doctor Pages
import DoctorPage from '../pages/DoctorPage';
import DoctorAbout from '../pages/DoctorAbout';
import DoctorServices from '../pages/DoctorServices';
import DoctorGallery from '../pages/DoctorGallery';
import DoctorServiceDetail from '../pages/DoctorServiceDetail';

// Play Zone Pages
import PlayZonePage from '../pages/PlayZonePage';
import PlayZoneAbout from '../pages/PlayZoneAbout';
import PlayZoneActivities from '../pages/PlayZoneActivities';
import PlayZoneGallery from '../pages/PlayZoneGallery';
import PlayZoneActivityDetail from '../pages/PlayZoneActivityDetail';
import PlayZoneServices from '../pages/PlayZoneServices';
import PlayZoneServiceDetail from '../pages/PlayZoneServiceDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* Doctor Routes (Protected) */}
      <Route path="/doctor" element={<ProtectedRoute expectedPlatform="doctor"><DoctorPage /></ProtectedRoute>} />
      <Route path="/doctor/about" element={<ProtectedRoute expectedPlatform="doctor"><DoctorAbout /></ProtectedRoute>} />
      <Route path="/doctor/services" element={<ProtectedRoute expectedPlatform="doctor"><DoctorServices /></ProtectedRoute>} />
      <Route path="/doctor/services/:id" element={<ProtectedRoute expectedPlatform="doctor"><DoctorServiceDetail /></ProtectedRoute>} />
      <Route path="/doctor/gallery" element={<ProtectedRoute expectedPlatform="doctor"><DoctorGallery /></ProtectedRoute>} />

      {/* Play Zone Routes (Protected) */}
      <Route path="/play-zone" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZonePage /></ProtectedRoute>} />
      <Route path="/play-zone/about" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneAbout /></ProtectedRoute>} />
      <Route path="/play-zone/activities" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneActivities /></ProtectedRoute>} />
      <Route path="/play-zone/activities/:id" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneActivityDetail /></ProtectedRoute>} />
      <Route path="/play-zone/services" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneServices /></ProtectedRoute>} />
      <Route path="/play-zone/services/:id" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneServiceDetail /></ProtectedRoute>} />
      <Route path="/play-zone/gallery" element={<ProtectedRoute expectedPlatform="play-zone"><PlayZoneGallery /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminProtectedRoute />}>
        <Route element={<AdminDashboard />}>
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="leads" element={<AdminLeads />} />
          
          {/* Doctor Admin Routes */}
          <Route path="doctor/settings" element={<DoctorSettings />} />
          <Route path="doctor/video-showcase" element={<VideoShowcaseAdmin websiteType="doctor" />} />
          <Route path="doctor/videos" element={<VideosGalleryAdmin websiteType="doctor" />} />
          <Route path="doctor/services" element={<DoctorServicesAdmin />} />
          <Route path="doctor/gallery" element={<DoctorGalleryAdmin />} />

          {/* Play Zone Admin Routes */}
          <Route path="playzone/settings" element={<PlayZoneSettings />} />
          <Route path="playzone/video-showcase" element={<VideoShowcaseAdmin websiteType="playzone" />} />
          <Route path="playzone/videos" element={<VideosGalleryAdmin websiteType="playzone" />} />
          <Route path="playzone/activities" element={<PlayZoneActivitiesAdmin />} />
          <Route path="playzone/services" element={<PlayZoneServicesAdmin />} />
          <Route path="playzone/gallery" element={<PlayZoneGalleryAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
