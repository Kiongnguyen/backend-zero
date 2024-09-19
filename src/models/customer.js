const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String,
  },
  { timestamps: true },
  {statics: {
    findByKiong(name) {
      return this.find({ name: new RegExp(name, 'i') });
    }
  }
  }
);

UserSchema.plugin(mongoose_delete);
// Override all methods
UserSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Customer = mongoose.model("Customer", UserSchema);

module.exports = Customer;
