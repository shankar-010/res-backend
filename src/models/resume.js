const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Resume = sequelize.define('Resume', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  template: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'modern',
  },
  personalInfo: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  education: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  workExperience: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  skills: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  projects: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  certifications: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  additionalInfo: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

User.hasMany(Resume);
Resume.belongsTo(User);

module.exports = Resume;