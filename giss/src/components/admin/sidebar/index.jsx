import React, { Fragment, useRef, useState } from 'react';
import { FaBars, FaTachometerAlt, FaSignOutAlt, FaCamera, FaProjectDiagram} from 'react-icons/fa';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/auth-slice';

const AdminSidebar = ({ open, setOpen }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { user } = useSelector(state => state.auth);
    const [profileImage, setProfileImage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState({ unit: 'px', aspect: 1, width: 150, height: 150 });
    const [imageRef, setImageRef] = useState(null); // Store the loaded image reference
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result); // Set selected image
                setIsDialogOpen(true); // Open dialog
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageLoaded = (image) => {
        setImageRef(image); // Save image reference
        return false; // Prevent ReactCrop from resetting crop
    };


    const handleCrop = () => {
        if (imageRef && crop.width && crop.height) {
            const canvas = document.createElement('canvas');
            const scaleX = imageRef.naturalWidth / imageRef.width;
            const scaleY = imageRef.naturalHeight / imageRef.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                imageRef,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            // Convert the cropped image to base64 URL
            const croppedImageUrl = canvas.toDataURL('image/jpeg');

            // Set the cropped image as profile picture
            setProfileImage(croppedImageUrl);

            // Reset the selected image and close dialog
            setSelectedImage(null);
            setIsDialogOpen(false);
        }
    };

    return (
        <Fragment>
            <Box height='100vh' width={open ? '80px' : '250px'} >
                <Sidebar collapsed={open} width={open ? '80px' : '250px'} style={{height:'100%'}}>
                    <Menu iconShape="square">
                        <MenuItem
                            icon={open ? <IconButton size='small' onClick={() => {
                                setOpen(!open);
                            }}><FaBars /></IconButton> : undefined}
                            onClick={() => {
                                setOpen(!open)
                            }}
                            style={{ margin: "10px 0 20px 0", color: '#000000' }}
                        >
                            {!open && (
                                <Box className='sidebarLogo'>
                                    <Typography variant='h6' fontWeight='700' color={colors.grey[100]}>ADMIN PANEL</Typography>
                                    <IconButton size='small' onClick={() => setOpen(!open)}>
                                        <FaBars />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>

                        {!open && (
                            <Box mb="25px" textAlign="center">
                                <div
                                    style={{ position: 'relative', display: 'inline-block' }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <img alt="profile-user" width="150px" height="150px" src={profileImage ? profileImage : '../../assets/user.png'}
                                        style={{ cursor: "pointer", borderRadius: "50%" }} />
                                    {isHovered && (
                                        <Box style={{ cursor: 'pointer' }} display='flex' position='absolute' top={0} width={150} borderRadius={50} height={150} alignItems='center' justifyContent='center' bgcolor='#97979756'>
                                            <label htmlFor="profile-image-upload" style={{ cursor: 'pointer' }}>
                                                <FaCamera
                                                    size={30}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        color: colors.grey[100],
                                                    }}
                                                    aria-label="Upload Profile Image"
                                                />
                                                <Typography variant="h6" mt={7} fontWeight='bold' fontSize={15} color={colors.grey[100]}>
                                                    Upload Image
                                                </Typography>
                                            </label>
                                        </Box>
                                    )}
                                    <input
                                        id="profile-image-upload"
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                        aria-label="Profile Image Upload"
                                    />
                                </div>
                                <Typography variant="h5" color={colors.grey[100]} fontWeight="700" sx={{ m: "10px 0 0 0" }}>
                                    {user?.name}
                                </Typography>
                            </Box>
                        )}

                        <MenuItem className='menu-item' icon={<FaTachometerAlt />} onClick={() => navigate('/admin/dashboard')}>Dashboard</MenuItem>
                        <MenuItem className='menu-item' icon={<FaProjectDiagram />} onClick={() => navigate('/admin/projects')}>Projects</MenuItem>
                        <MenuItem className='menu-item' icon={<FaSignOutAlt />} onClick={() => handleLogout()}>Logout</MenuItem>
                    </Menu>
                </Sidebar>
            </Box>
            <Dialog open={isDialogOpen} onClose={() => selectedImage && setIsDialogOpen(false)} maxWidth="md" >
                <DialogTitle>Crop Image</DialogTitle>
                <DialogContent>
                    <Box height='auto'>
                        {selectedImage && (
                            <ReactCrop
                                crop={crop}
                                src={selectedImage}
                                onImageLoaded={handleImageLoaded}
                                onChange={newCrop => setCrop({ ...newCrop, width: newCrop.width, height: newCrop.width })}
                                onComplete={(c) => setCrop(c)}
                                ruleOfThirds
                            >
                                <img width='100%' height='500px' ref={setImageRef} src={selectedImage} alt="Crop Preview" />
                            </ReactCrop>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={handleCrop} color='primary'>
                        Crop
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default AdminSidebar;
