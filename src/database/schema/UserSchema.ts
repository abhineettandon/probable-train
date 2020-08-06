import { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
firstName: {
  type: String,
  required: true,
},
lastName: {
  type: String,
  required: true,
},
email: {
  type: String,
  required: true,
  unique: true,
},
password: {
  type: String,
  required: true
},
role: {
  type: String,
  required: true,
},
lastLogin: {
  type: Date,
  default: null
}
}, { timestamps: true });

export { UserSchema };
