import { Schema, model, models } from "mongoose";

const packageSchema = new Schema({
  title: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,

  },
  category: {
    type: String,
    required: true,
    enum: ["Medical", "Cosmetic"] // Ensures valid categories only
  },
  packageType: {
    type: String,
    required: true,
    enum: ["Gold", "Silver", "Bronze"] // Ensures valid package types only
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0 // Enforces a minimum price (optional)
  },
  images: [
    {
      type: String,
    },
  ],
  services: [{ name: String, description: String }],

  doctor: 
    {
      name: {
        type: String,
        required: true,

      },
      description: {
        type: String,


      }
    }
  ,
  accommodation: {
    type: {
      type: String,
      required: true,
      enum: ["Hotel", "Hotel-Apartment"] // Ensures valid accommodation types only
    },
    stars: {
      type: Number,

      min: 1, // Enforces a minimum number of stars (optional)
      max: 5 // Enforces a maximum number of stars (optional)
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    amenities: [
      {
        type: String,

      }
    ]
  },
  transportation: {
    type: {
      type: String,
      required: true,
      enum: ["Airport", "Train", "Taxi"] // Ensures valid transport types only
    }
  },
  duration: {
    type: Number,

  },
  benefits:[
    {
      type: String,

    }
  ]

    
  ,
  faq: [{ question: String, answer: String }]
  
},
{ timestamps: true } // Timestamps are automatically added
);

const Package = models.Package || model('Package', packageSchema);

export default Package;
