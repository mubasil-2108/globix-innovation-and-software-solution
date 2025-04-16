const { imageUploadUtil } = require("../../../helper/cloudinary")
const Project = require("../../../models/project")

const handleImageUpload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No images provided'
            });
        }

        const imageUrls = await Promise.all(req.files.map(async (file) => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const url = "data:" + file.mimetype + ";base64," + b64;
            const result = await imageUploadUtil(url);
                return result.secure_url;
        }))

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrls,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

const addProject = async (req, res) => {
    const { image, projectName, projectDescription, technologies, gitHubUrl, websiteUrl } = req.body;
    try {
        const newlyAddedProject = new Project({
            projectImage: image,
            projectName,
            projectDescription,
            projectTechnologies:technologies,
            gitHubUrl,
            websiteUrl
        })

        await newlyAddedProject.save();
        res.status(200).json({
            success: true,
            message: 'Project added successfully',
            data: newlyAddedProject,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}


const fetchAllProjects = async (req, res) => {
    try{
        const projects = await Project.find({});
        res.status(200).json({
            success: true,
            message: 'Projects fetched successfully',
            data: projects,
        })
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Project deleted successfully',
        })
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

module.exports = { handleImageUpload, deleteProject, addProject, fetchAllProjects }