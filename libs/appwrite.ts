import { Client, Account,ID} from 'appwrite';
const client = new Client();
client.setProject('67f90d8e000cd0baae24');

export const ACCOUNT= new Account(client);
export const UNIQUE_ID =  ID.unique();
