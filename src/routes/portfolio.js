const express = require('express')
const router = express.Router()
const {
  getProjects,
  getProject,
  getExperiences,
  getTestimonials,
  getServices,
} = require('../controllers/portfolioController')

// GET /api/projects
router.get('/projects', getProjects)
// GET /api/projects/:id
router.get('/projects/:id', getProject)

// GET /api/experiences          (அனைத்தும்)
// GET /api/experiences?type=work (வகை வாரியாக)
router.get('/experiences', getExperiences)

// GET /api/testimonials
router.get('/testimonials', getTestimonials)

// GET /api/services
router.get('/services', getServices)

module.exports = router
