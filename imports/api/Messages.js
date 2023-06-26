import { Mongo } from 'meteor/mongo';

// Create a new MongoDB collection named "messages"
export const Messages = new Mongo.Collection('messages');
