import { Schema, model, models } from 'mongoose';
import Package from './Package'; // Import the Package model
// Register the Package model
const packageModel = models.Package || model('Package', Package.schema);

const MessageSchema = new Schema(
  {

    Package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },
    packageType: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      
    },
    Name: {
      type: String,
      required: [true, 'Name is required'],
    },
    Email: {
      type: String,
      required: [true, 'Email is required'],
    },
    Phone: {
      type: String,
    },
    Invite: {
      type: String,
    },
    Address: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
