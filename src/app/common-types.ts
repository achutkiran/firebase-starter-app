import {firestore} from "firebase/app"

export interface Chat {
    name: string,
    text: string,
    profilePicUrl: string,
    timestamp: firestore.FieldValue
  }