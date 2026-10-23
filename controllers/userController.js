// const multer = require('multer');
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });
// exports.user_image = [upload.single('image'), async (req, res) => {


// }];
export const user_image = [
    upload.single('image'), 
    async (req, res) => {
        try {
            // Check if a file was actually uploaded
            if (!req.file) {
                return res.status(400).json({ error: 'No image file provided' });
            }

            // req.file.filename contains the final saved name (with Date.now() prefix)
            return res.status(200).json({
                message: 'Image uploaded successfully',
                imageName: req.file.filename
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Something went wrong during the upload' });
        }
    }
];


export const update_user_image = [
    upload.single('image'),
    async (req, res) => {
        try {
            // 1. Check if a new file was uploaded
            if (!req.file) {
                return res.status(400).json({ error: 'No new image file provided' });
            }

            const newImageName = req.file.filename;
            const oldImageName = req.body.oldImageName; // Expecting the old filename passed from the client

            // 2. Delete the old image if its name was provided and the file exists
            if (oldImageName) {
                const oldImagePath = path.join('./uploads/', oldImageName);
                
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log(`Successfully deleted old image: ${oldImageName}`);
                }
            }

            // 3. Return the new image name to the client
            return res.status(200).json({
                message: 'Image updated successfully',
                imageName: newImageName
            });

        } catch (error) {
            console.error(error);

            // Safety cleanup: If an error occurs after upload, delete the newly uploaded file to avoid clutter
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }

            return res.status(500).json({ error: 'Something went wrong while updating the image' });
        }
    }
];