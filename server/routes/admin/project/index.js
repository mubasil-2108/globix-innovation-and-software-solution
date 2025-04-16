
const express = require('express');
const {addProject, handleImageUpload,deleteProject, fetchAllProjects} = require('../../../controllers/admin/project');
const {upload} = require('../../../helper/cloudinary')

const router = express.Router();

router.post('/upload-image', upload.array('images', 10), handleImageUpload);
router.post('/add', addProject);
router.get('/get', fetchAllProjects);
router.delete('/delete/:id', deleteProject);

module.exports = router;



