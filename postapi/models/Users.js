const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const CoinHistorySchema = new Schema({
  eventName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  coinsEarned: {
    type: Number,
    required: true,
    default: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    number: {
      type: String,
      maxlength: 10,
      
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isContributor: {
      type: Boolean,
      default: true,
    },
    isReq: {
      type: Boolean,
      default: false,
    },
    coinHistory: [CoinHistorySchema],
   
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    firstName: {
      type: String,
      maxlength: 50,
    },
    lastName: {
      type: String,
      maxlength: 50,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    bio: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    education: [
      {
        instituteName: {
          type: String,
        },
        degree: {
          type: String,
        },
        fieldOfStudy: {
          type: String,
        },
        grade: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
      },
    ],
    work: [
      {
        position: {
          type: String,
        },
        companyName: {
          type: String,
        },
        fieldType: {
          type: String,
        },
        employmentType: {
          type: String,
        },
        companyCity: {
          type: String,
        },
        companyState: {
          type: String,
        },
        companyPincode: {
          type: String,
        },
        companyJoiningDate: {
          type: String,
        },
        companyEndDate: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

// Adding a virtual field to calculate total coins
UsersSchema.virtual("totalCoins").get(function () {
  return this.coinHistory.reduce(
    (total, history) => total + history.coinsEarned,
    0
  );
});

// Pre-save hook to update totalCoins before saving the document
UsersSchema.pre("save", function (next) {
  this.totalCoins = this.coinHistory.reduce(
    (total, history) => total + history.coinsEarned,
    0
  );
  next();
});

module.exports = mongoose.model("Users", UsersSchema);
