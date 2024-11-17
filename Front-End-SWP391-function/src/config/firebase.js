// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCJ-lGODDySUpAJ3W0M2lNUXZp271oco-Q',
    authDomain: 'furryfriendshaven-acfd9.firebaseapp.com',
    projectId: 'furryfriendshaven-acfd9',
    storageBucket: 'furryfriendshaven-acfd9.appspot.com',
    messagingSenderId: '953872004242',
    appId: '1:953872004242:web:63cc721d6c54af4e5aa24b',
    measurementId: 'G-K4PNSL8H5K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

/////////////////////////////////////////////////
// Import the functions you need from the SDKs you need

// import { initializeApp } from 'firebase/app';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//     apiKey: 'AIzaSyDOF-zQJt6SffEzPueUvtSCrw7cuWqtVhI',
//     authDomain: 'blogswp-c0f57.firebaseapp.com',
//     projectId: 'blogswp-c0f57',
//     storageBucket: 'blogswp-c0f57.appspot.com',
//     messagingSenderId: '790592015585',
//     appId: '1:790592015585:web:89f4bf2b0a46144777bba0',
//     measurementId: 'G-520RNQ4KMD',
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// export { storage };

//////////////////////////////////////////////////////
// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import * as firebase from 'firebase';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: 'AIzaSyBJ2ypZv4fJos5xrLh_kUWLTf6TQ1cquy0',
//     authDomain: 'fir-swp-92e06.firebaseapp.com',
//     projectId: 'fir-swp-92e06',
//     storageBucket: 'fir-swp-92e06.appspot.com',
//     messagingSenderId: '70254462829',
//     appId: '1:70254462829:web:c16cddacb46b768cf23c64',
//     measurementId: 'G-LJJWZ8QBQ9',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const firebaseApp = firebase.initializeApp(firebaseConfig);
