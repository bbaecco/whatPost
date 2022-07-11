const { User } = require('../models');

module.exports = {
  idcheck: async(username) => {
    try {
      const result = await User.findOne({
        where: { username }
      });
      return result;
    }catch(err) {
      console.error(err);
      throw new Error('BROKEN');
    }
  },
  signup: async(username, pwd, email) => {
    try {
      const result = await User.create({
        username,
        pwd,
        email
      });
      return result;
    } catch(err) {
      console.error(err);
      throw new Error('BROKEN');
    }
  },
  signin: async(username) => {
    try {
      const result = await User.findOne({
        where: {
          username: username
        }
      });
      return result;
    } catch(err) {
      console.error(err);
      throw new Error('BROKEN');
    }
  }
}