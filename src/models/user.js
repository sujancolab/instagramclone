const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema =new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        lowercase: true
      },
      userFullName: {
        type: String,
        trim: true,
        lowercase: true
      },
      model:{
        type: String,
        
      },
      role: {
        type: String,
      },
      userEmail: { type: String, required: true, trim: true, lowercase: true },
      userDOB: {
        type: String
      },
      hash_password: {
        type: String,
        required: true
      },
      userPhone: {
        type: String
      },
      userImg: {
        type: String,
        default :'https://app-file-manager.s3.ap-south-1.amazonaws.com/user.png'
      },
      userGender: {
        type: String,
        enum: ['male', 'female', 'other']
      },
      userCountry: {
        type: String
      },
      userBio: {
        type: String
      },
      userIsGoogle: {
        type: Boolean,
      },
      userIsPhone: {
        type: Boolean
      },
      userIsFacebook: {
        type: Boolean
      },
      userToken: {
        type: String
      },
      
},{
    timestamps:true
});

userSchema.virtual('userPassword')
.set(function(userPassword) {
    this.hash_password = bcrypt.hashSync(userPassword,10);
});

userSchema.methods={
    authenticate: function(userPassword) {
        return bcrypt.compareSync(userPassword,this.hash_password)
    }
}

module.exports =mongoose.model('User',userSchema);