import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp();

exports.addWelcomeMessages = functions.auth.user().onCreate(async (user) =>{
    console.log('new user signed in for the first time.');
    const fullName = user.displayName || 'Anonymous';

    await admin.firestore().collection('messages').add({
        name:'Firebase Bot',
        text: `${fullName} signed in for the first time! Welcome!`,
        profilePicUrl:'/assets/images/firebase-logo.png',
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log("welcome message written to database.");
})


exports.sendNotifications = functions.firestore.document('messages/{messageId}').onCreate(
    async (snapshot) =>{
        const data = snapshot.data();
        if(data){
            const text:string = data.text;
            const payload = {
                notification: {
                    title: `${data.name} posted ${text ? 'a message' : 'an image'}`,
                    body: text ? (text.length <= 100 ? text : text.substring(0,97) + '...') : '',
                    icon: data.profilePicUrl || '/images/profile_placeholder.png',
                    click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com`
                }
            };
            
            const allTokens = await admin.firestore().collection('fcmTokens').get();
            let tokens:string[] = [];
            allTokens.forEach((tokenDoc) => {
                tokens.push(tokenDoc.id);
            })

            if(tokens.length>0){
                const response = await admin.messaging().sendToDevice(tokens,payload)
                await cleanupTokens(response,tokens);
                console.log('Notifications have been sent and tokens cleaned up.')
            }
        }
    }
)

function cleanupTokens(response:admin.messaging.MessagingDevicesResponse,tokens:string[]){
    let tokensDelete:Promise<FirebaseFirestore.WriteResult>[] = [];
    response.results.forEach((result, index) =>{
        const error = result.error;
        if (error) {
            console.error('Failure sending notification to', tokens[index],error);
            if (error.code == 'messaging/invalid-registration-token' ||
                error.code == 'messaging/registration-token-not-registered') {
                const deleteTask = admin.firestore().collection('fcmTokens').doc(tokens[index]).delete();
                tokensDelete.push(deleteTask);
            }
        }
    });
    return Promise.all(tokensDelete);
}