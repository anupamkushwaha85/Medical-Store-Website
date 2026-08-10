import admin from 'firebase-admin';

export const initFirebase = () => {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey || privateKey.includes('REPLACE_WITH_YOUR_PRIVATE_KEY') || privateKey.includes('your_private_key')) {
        console.warn('⚠️  Firebase Admin initialization skipped until valid credentials are provided.');
        return;
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey,
            }),
        });
        console.log("✅ Firebase Admin Initialized");
    } catch (error) {
        console.warn('⚠️  Firebase Admin initialization skipped:', error.message);
    }
};

export default admin;
