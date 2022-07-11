const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allownull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "기본키(내부 조인용)"
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      comment: "고유번호 UUID(외부 접근용)"
    },
    username: {
      type: DataTypes.STRING(50),
      allownull: false,
      comment: "유저 아이디"
    },
    pwd: {
      type: DataTypes.STRING(100),
      allownull: false,
      comment: "유저 비밀번호"
    },
    email: {
      type: DataTypes.STRING(100),
      allownull: false,
      validate: {
        isEmail: true
      },
      comment: "유저 이메일"
    }
  }, {
    charset: "utf8",
    collate: "utf8_general_ci",
    tableName: "User",
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.pwd = bcrypt.hashSync(user.pwd, salt);
      }
    },
    instanceMethods: {
      validPassword: function(pwd) {
        return bcrypt.compareSync(pwd, this.pwd);
      }
    }
  });

  // User.associate = models => {
  //   /*User 모델의 "id" 값을 Post 모델에 "user_id" 컬럼으로 추가한다. */
  //   User.hasMany(models.Post, {foreginKey: "user_id", sourceKey: "id"});
  // };

  User.associate = models => {
    /*User 모델의 "id" 값을 Post 모델에 "user_id" 컬럼으로 추가한다. */
    User.hasMany(models.Post, {
      foreginKey: "user_id", 
      onDelete: 'cascade'});
  };
  return User;
};