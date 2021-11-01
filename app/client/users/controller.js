import bcrypt from 'bcrypt';
import sha256 from 'crypto-js/sha256.js';
import hmacSHA512 from 'crypto-js/hmac-sha512.js';
import Base64 from 'crypto-js/enc-base64.js';
import redis from '../../config/redis.js';
import mongoose from 'mongoose';
import { userSchema } from './schema.js';

const User = mongoose.model('User', userSchema);
const saltRounds = 10;

async function hashPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

async function createRandomNumber(length) {
  let result = '';
  const string = '0123456789';

  for (let i = 0; i < length; i++) {
    result += string.charAt(Math.floor(Math.random() * string.length));
  }

  return result;
}

async function signUp(req, res) {
  const { userName, emailAddress, password } = req.body;
  const hashedPassword = await hashPassword(password);

  const check = await User.exists({ emailAddress });
  const count = await User.count();

  if (check) {
    return res.status(400).json({ message: 'Email already registered'});
  }

  if (!check) {
    const accountNumber = await createRandomNumber(8);
    const identityNumber = await createRandomNumber(16);
    const userId = count + 1;
    const createNewUserData = {
      userId,
      userName,
      emailAddress,
      password: hashedPassword,
      accountNumber,
      identityNumber
    };
    const newUser = await User.create({ ...createNewUserData });
    return res.status(200).json({ message: 'Create New User Success', data: newUser })
  }

}

async function signIn(req, res) {
  const { emailAddress, password } = req.body;
  const user = await User.findOne({ emailAddress }).exec();

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Please make sure you enter the correct email and password'});
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    const hashDigest = await sha256(user.accountNumber);
    const token = Base64.stringify(hmacSHA512(hashDigest, user.identityNumber));
    redis.setExAsync(token, 1800, '');
    user.password = undefined;
    return res.status(200).json({ message: 'Sign in Success', user, token })
  }

}

async function getAllUsers(req, res){
  const allUsers = await User.find();
  return res.status(200).json({ message: 'Get All Users Success', allUsers })

}

async function getUser(req, res){
  const { userId } = req.params;
  const user = await User.findOne({ userId }).exec();
  return res.status(200).json({ message: 'Get All Users Success', user })

}

async function updateUser(req, res){
  const { userId } = req.params;
  const data = req.body;
  const user = await User.exists({ userId });

  if(!user) {
    return res.status(400).json({ message: 'User not found'});
  }

  if(user) {
    const userUpdate = await User.findOneAndUpdate(userId, data);
    return res.status(200).json({ message: 'Update Success' })
  }

}

async function deleteUser(req, res){
  const { userId } = req.params;
  const user = await User.exists({ userId });

  if(!user) {
    return res.status(400).json({ message: 'User not found'});
  }

  if(user) {
    await User.deleteOne({ userId });
    return res.status(200).json({ message: 'Delete Success' })
  }

}




export {
  signUp,
  signIn,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
