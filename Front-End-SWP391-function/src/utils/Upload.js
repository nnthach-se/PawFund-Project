import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '~/config/firebase';

const uploadFile = async (file) => {
    console.log('OG file to upload', file);
    const storageRef = ref(storage, file.name);
    console.log('storageRef', storageRef);
    const response = await uploadBytes(storageRef, file);
    console.log('response', response);
    const downloadURL = await getDownloadURL(response.ref);
    console.log('downloadURL', downloadURL);
    return downloadURL;
};

export default uploadFile;
