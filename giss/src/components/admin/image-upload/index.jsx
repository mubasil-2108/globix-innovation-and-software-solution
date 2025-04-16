import { Box, IconButton, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { FaAngleLeft, FaAngleRight, FaCamera } from 'react-icons/fa'
import { tokens } from '../../../theme';
import axios from 'axios';

const ProjectImageUpload = ({ setIsHovered, files, setUploadedImageUrl, selectedImage, currentIndex, isHovered, handleNextImage, handleImageChange, handlePrevImage }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const uploadImageToCloudinary = async () => {

        if (files.length === 0) return;

        const formData = new FormData();
        files.forEach((image) => formData.append('images', image));
        try {
            const response = await axios.post('http://localhost:5000/api/admin/projects/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response?.data?.success) {
                setUploadedImageUrl(response?.data?.imageUrls);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }

    useEffect(() => {
        if (files.length > 0) {
            uploadImageToCloudinary();
        }
    }, [files])

    return (
        <Box
            component='div'
            sx={{
                position: 'relative',
                width: '100%',
                height: '200px',
                borderRadius: '5%',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(196,196,196,1)',
                mt: 5
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {
                selectedImage.length > 0 ? (
                    <img
                        alt="selected"
                        src={selectedImage[currentIndex]}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5%' }}
                    />
                )
                    :
                    (
                        <img
                            alt="defaultImage"
                            width="100%"
                            src='../../assets/defaultImage.jpg'
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5%' }}
                        />
                    )
            }

            {isHovered && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: '5%',
                    }}
                >
                    <label htmlFor="project-image-upload" style={{ cursor: 'pointer', textAlign: 'center' }}>
                        <FaCamera
                            size={30}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: colors.grey[100],
                            }}
                            aria-label="Upload Project Image"
                        />
                        <Typography variant="h6" mt={7} fontWeight='bold' fontSize={15} color={colors.grey[100]}>
                            Upload Image
                        </Typography>
                    </label>
                </Box>
            )}
            <input
                id="project-image-upload"
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleImageChange}
                aria-label="Project Image Upload"
            />

            {selectedImage.length > 1 && (
                <>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            left: 10,
                            top: '40%',
                            borderRadius: '20%',
                            color: colors.grey[100],
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                        }}
                        onClick={handlePrevImage}
                    >
                        <FaAngleLeft size={24} />
                    </IconButton>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: '40%',
                            borderRadius: '20%',
                            color: colors.grey[100],
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                        }}
                        onClick={handleNextImage}
                    >
                        <FaAngleRight size={24} />
                    </IconButton>
                </>
            )}
        </Box>
    )
}

export default ProjectImageUpload