import mongoose from 'mongoose'

const resource = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    empType: {
      type: String,
      required: true,
      enum: ['Permanent', 'Contract'],
    },
    role: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { collection: 'resource' }
)

const ResourceModel = mongoose.model('resource', resource)
export { ResourceModel }
