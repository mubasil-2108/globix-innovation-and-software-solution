import { Autocomplete, Box, Button, Chip, Drawer, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import './admin-project.css'
import { FaProjectDiagram } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AdminProjectTile, ProjectImageUpload } from '../../../components/admin';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProject, fetchAllProjects } from '../../../store/project-slice';

const initialState = {
    image: [],
    projectName: "",
    projectDescription: "",
    gitHubUrl: "",
    websiteUrl: "",
    technologies: [],
}

const commonTechnologies = [
    'React',
    'React Native',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Express',
    'MongoDB',
    'Firebase',
    'Redux',
    'Material-UI',
    'HTML',
    'CSS',
    'SASS',
    'Git',
    'Docker',
    'AWS',
    'Python',
    'Django',
    'Flask',
    'Java',
    'Spring Boot',
    'Kotlin',
    'Swift',
    'Android',
    'iOS',
];

const AdminProject = () => {
    const [open, setOpen] = useState(false);
    const { projectList } = useSelector(state => state.adminProject);
    const [uploadedImageUrl, setUploadedImageUrl] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [files, setFiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const newImages = files.map((file) => URL.createObjectURL(file));
            setSelectedImage(prev => [...prev, ...newImages]);
            setFiles(prev => [...prev, ...files]);
            if (selectedImage.length === 0) {
                setCurrentIndex(0);
            }
        }
    };

    const handleNextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % selectedImage.length);
    }

    const handlePrevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + selectedImage.length) % selectedImage.length);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewProject({
            ...formData,
            image: uploadedImageUrl
        })).then((data) => {
            if (data?.payload?.success) {
                toast.success(data?.payload?.message);
                console.log(data, 'This is data');
                dispatch(fetchAllProjects());
                setOpen(false);
                setSelectedImage([]);
                setFiles([]);
                setFormData(initialState);
            }
        })
    }

    useEffect(() => {
        dispatch(fetchAllProjects());
    }, [dispatch])
    console.log(projectList, 'This is projectList');
    return (
        <Fragment>
            <Box sx={{ pb: 8, px: 2, }}>
                <Box className="btn-box">
                    <Button onClick={toggleDrawer(true)} variant='contained' sx={{ background: '#000000' }}>
                        Add New Project
                    </Button>
                </Box>
                <Box className='grid-container' sx={{ mt: 5, mb: 10 }}>
                    {
                        projectList && projectList.length > 0 ?
                            projectList.map((item) => (
                                <AdminProjectTile project={item} />
                            ))
                            :
                            null
                    }
                </Box>
                <Drawer open={open} anchor='right' onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 300, padding: 2, overflowX: 'hidden', overflowY: 'auto' }} role="presentation" >
                        <Box mt={5} display='flex' gap={2} alignItems='center'>
                            <Typography variant='h4' fontSize={25} fontWeight='bold'>Add New Project</Typography>
                            <FaProjectDiagram size={30} />
                        </Box>
                        <ProjectImageUpload
                            currentIndex={currentIndex}
                            isHovered={isHovered}
                            handleImageChange={handleImageChange}
                            handleNextImage={handleNextImage}
                            handlePrevImage={handlePrevImage}
                            selectedImage={selectedImage}
                            setIsHovered={setIsHovered}
                            setUploadedImageUrl={setUploadedImageUrl}
                            files={files}
                        />
                        <form action="#" onSubmit={onSubmit}>
                            <Box
                                component='div'
                                sx={{ '& > :not(style)': { width: '100%', mt: 3 } }}
                            >
                                <TextField
                                    required
                                    sx={{
                                        '& .MuiInputBase-root': { height: 45, },
                                        '& .MuiInputLabel-root': { fontSize: '12px' }, // Reduces label font size
                                        '& .MuiInputLabel-root.Mui-focused': { fontSize: '12px' } // Keeps size small when focused
                                    }}
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        projectName: e.target.value
                                    })}
                                    id='outlined-basic' label='Project Name' variant='outlined' />
                            </Box>
                            <Box
                                component='div'
                                sx={{ '& > :not(style)': { width: '100%', mt: 2 } }}
                            >
                                <TextField
                                    sx={{
                                        // '& .MuiInputBase-root': { height: 45, },
                                        '& .MuiInputLabel-root': { fontSize: '12px' }, // Reduces label font size
                                        '& .MuiInputLabel-root.Mui-focused': { fontSize: '12px' } // Keeps size small when focused
                                    }}
                                    multiline
                                    value={formData.projectDescription}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        projectDescription: e.target.value
                                    })}
                                    rows={4}
                                    id='outlined-multiline-static' label='Project Description' variant='outlined' />
                            </Box>
                            <Box
                                component='div'
                                sx={{ '& > :not(style)': { width: '100%', mt: 2 } }}
                            >
                                <Autocomplete
                                    multiple
                                    freeSolo
                                    options={commonTechnologies}
                                    value={formData.technologies}
                                    onChange={(event, newValue) => {
                                        setFormData({
                                            ...formData,
                                            technologies: newValue
                                        });
                                    }}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                variant="outlined"
                                                label={option}
                                                {...getTagProps({ index })}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Technologies"
                                            placeholder="Add technologies"
                                            sx={{
                                                '& .MuiInputBase-root': { height: 'auto', minHeight: 45 },
                                                '& .MuiInputLabel-root': { fontSize: '12px' },
                                                '& .MuiInputLabel-root.Mui-focused': { fontSize: '12px' }
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                            <Box
                                component='div'
                                sx={{ '& > :not(style)': { width: '100%', mt: 2 } }}
                            >
                                <TextField
                                    sx={{
                                        '& .MuiInputBase-root': { height: 45, },
                                        '& .MuiInputLabel-root': { fontSize: '12px' }, // Reduces label font size
                                        '& .MuiInputLabel-root.Mui-focused': { fontSize: '12px' } // Keeps size small when focused
                                    }}
                                    value={formData.gitHubUrl}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        gitHubUrl: e.target.value
                                    })}
                                    id='outlined-basic' label='GitHub Link' variant='outlined' />
                            </Box>
                            <Box
                                component='div'
                                sx={{ '& > :not(style)': { width: '100%', mt: 2 } }}
                            >
                                <TextField
                                    sx={{
                                        '& .MuiInputBase-root': { height: 45, },
                                        '& .MuiInputLabel-root': { fontSize: '12px' }, // Reduces label font size
                                        '& .MuiInputLabel-root.Mui-focused': { fontSize: '12px' } // Keeps size small when focused
                                    }}
                                    value={formData.websiteUrl}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        websiteUrl: e.target.value
                                    })}
                                    id='outlined-basic' label='Website Link (Optional)' variant='outlined' />
                            </Box>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type='submit' variant='contained' sx={{ background: '#000000' }}>Add Project</Button>
                            </Box>
                        </form>
                    </Box>
                </Drawer>
            </Box>
        </Fragment>
    )
}

export default AdminProject