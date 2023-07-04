import { Mongo } from 'meteor/mongo';

// Create a new MongoDB collection named "messages"
export const Rooms = new Mongo.Collection('rooms');
