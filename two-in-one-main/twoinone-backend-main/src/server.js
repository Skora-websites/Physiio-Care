const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load env FIRST
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (production ready)
// A specific origin + credentials is only sent when CLIENT_URL is configured.
// ('*' combined with credentials:true is rejected by browsers per the CORS spec,
// so when CLIENT_URL is unset we allow any origin without credentials.)
const clientUrl = process.env.CLIENT_URL;
app.use(cors({
    origin: clientUrl || '*',
    ...(clientUrl ? { credentials: true } : {})
}));

// Static folder
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const leadRoutes = require('./routes/leadRoutes'); // ✅ keep
const statsRoutes = require('./routes/statsRoutes');

const pzActivityRoutes = require('./routes/pzActivityRoutes');
const pzAboutRoutes = require('./routes/pzAboutRoutes');
const pzServiceRoutes = require('./routes/pzServiceRoutes');
const pzGalleryRoutes = require('./routes/pzGalleryRoutes');
const videoShowcaseRoutes = require('./routes/videoShowcaseRoutes');
const videoRoutes = require('./routes/videoRoutes');

// API Routes
app.use('/api/videos', videoRoutes);
app.use('/api/video-showcase', videoShowcaseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/leads', leadRoutes); // ✅ restored
app.use('/api/stats', statsRoutes);

// Play Zone
app.use('/api/playzone/activities', pzActivityRoutes);
app.use('/api/playzone/about', pzAboutRoutes);
app.use('/api/playzone/services', pzServiceRoutes);
app.use('/api/playzone/gallery', pzGalleryRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});