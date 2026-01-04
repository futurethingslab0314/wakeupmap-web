import admin from 'firebase-admin';

// 初始化 Firebase Admin SDK（如果尚未初始化）
if (!admin.apps.length) {
    const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID,
    });
}

const db = admin.firestore();

export default async function handler(req, res) {
    // 設置 CORS 標頭
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 如果是 OPTIONS 請求，直接返回
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允許 GET 請求
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: `方法 ${req.method} 不被允許` });
        return;
    }

    try {
        const appId = 'default-app-id-worldclock-history';
        const userProfileId = 'sleepAirline';
        const flightCollectionPath = `artifacts/${appId}/userProfiles/${userProfileId}/flight`;

        console.log(`🔍 查詢路徑: ${flightCollectionPath}`);

        // 獲取 flight 集合中的所有文件
        const flightCollectionRef = db.collection(flightCollectionPath);
        const snapshot = await flightCollectionRef.get();

        if (snapshot.empty) {
            console.log('⚠️ 未找到任何 flight 資料');
            return res.status(200).json({ flights: [] });
        }

        // 將所有文件轉換為陣列
        const flights = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            flights.push({
                id: doc.id,
                ...data
            });
        });

        // 按照 recordedAt 或 localTime 排序（最新的在前）
        flights.sort((a, b) => {
            const timeA = a.recordedAt || a.localTime || a.wakeTime || '';
            const timeB = b.recordedAt || b.localTime || b.wakeTime || '';
            return timeB.localeCompare(timeA); // 降序排列
        });

        console.log(`✅ 成功獲取 ${flights.length} 筆 flight 資料`);

        return res.status(200).json({
            success: true,
            count: flights.length,
            flights: flights
        });

    } catch (error) {
        console.error('❌ 獲取 flight 資料失敗:', error);
        return res.status(500).json({
            error: '獲取 flight 資料失敗',
            message: error.message
        });
    }
}

