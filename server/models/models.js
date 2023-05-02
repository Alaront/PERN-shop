import sequelize from '../db.js';
import {DataTypes} from "sequelize";

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER"
    },
    isBanned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})


const UserOperation = sequelize.define('userOperation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
    },
    sum: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: "USER"
    },
})


const UserShop = sequelize.define('userShop', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    phone: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    country: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    img: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
})

const Device = sequelize.define('device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.INTEGER
    },
    discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    countSales: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
})

const DeviceInfo = sequelize.define('deviceInfo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: DataTypes.STRING
    },
    text: {
        type: DataTypes.STRING(1234),
        defaultValue: 0
    },
    ratingSetUsers: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    mainPhoto: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
})

const DevicePhoto = sequelize.define('devicePhoto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    text: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
})

const DeviceCharacteristics = sequelize.define('deviceCharacteristic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: 0
    },
})

const Review = sequelize.define('review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING
    },
    positive: {
        type: DataTypes.STRING
    },
    negative: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
})

const ReviewComment = sequelize.define('reviewComment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
})

const Question = sequelize.define('question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING(1234)
    }
})

const QuestionAnswer = sequelize.define('questionAnswer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING(1234)
    }
})

const Type = sequelize.define('type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    },
})

const Brand = sequelize.define('brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    },
})

User.hasOne(UserShop);
UserShop.belongsTo(User);

User.hasMany(UserOperation);
UserOperation.belongsTo(User);

UserShop.hasMany(Review)
Review.belongsTo(UserShop)

UserShop.hasMany(Device);
Device.belongsTo(UserShop);

Device.hasOne(DeviceInfo)
DeviceInfo.belongsTo(Device)

Device.hasMany(DeviceCharacteristics)
DeviceCharacteristics.belongsTo(Device)

Device.hasMany(Review)
Review.belongsTo(Device)

User.hasMany(Review)
Review.belongsTo(User)

Device.hasMany(Question)
Question.belongsTo(Device)

User.hasMany(Question)
Question.belongsTo(User)

Device.hasMany(DevicePhoto);
DevicePhoto.belongsTo(Device)

Review.hasMany(ReviewComment)
ReviewComment.belongsTo(Review)

Question.hasMany(QuestionAnswer);
QuestionAnswer.belongsTo(Question)

User.hasMany(QuestionAnswer)
QuestionAnswer.belongsTo(User)

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

export {Brand, UserShop, Review, DeviceInfo, Type, User, ReviewComment, DeviceCharacteristics, Device, UserOperation, DevicePhoto, QuestionAnswer, Question}