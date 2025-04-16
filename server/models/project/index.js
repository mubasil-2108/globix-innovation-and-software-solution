const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectImage: [String],
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    projectTechnologies: {
        type: [String],
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
        trim: true,
    },
    gitHubUrl: {
        type: String,
        required: true,
    },
    websiteUrl: {
        type: String
    },

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
