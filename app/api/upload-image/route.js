import fs from 'fs/promises';
import path from 'path';

export const uploadImage = async (request) => {
  try {
    const image = request.files.image;
    const imagePath = path.join('public', 'img', image.name);
    await fs.writeFile(imagePath, image.data);

    request.res.json({ imageUrl: `/img/${image.name}` });
  } catch (error) {
    console.error(error);
    request.res.status(500).json({ message: 'Failed to upload image' });
  }
};

export default uploadImage;