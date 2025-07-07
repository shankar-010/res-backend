const Resume = require('../models/resume');
const User = require('../models/user');
const path = require('path');
const fs = require('fs');

exports.createResume = async (req, res) => {
  try {
    const resumeData = { ...req.body, userId: req.user.id };
    if (req.file) {
      resumeData.personalInfo = {
        ...resumeData.personalInfo,
        profilePicture: `/uploads/${req.file.filename}`,
      };
    }
    const resume = await Resume.create(resumeData);
    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(400).json({ error: 'Failed to create resume' });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.findAll({ where: { userId: req.user.id } });
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(400).json({ error: 'Failed to retrieve resumes' });
  }
};

exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
   console.error('Get resume error:', error);
    res.status(400).json({ error: 'Failed to retrieve resume' });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    const resumeData = { ...req.body };
    if (req.file) {
      if (resume.personalInfo?.profilePicture) {
        fs.unlinkSync(path.join(__dirname, '..', resume.personalInfo.profilePicture));
      }
      resumeData.personalInfo = {
        ...resumeData.personalInfo,
        profilePicture: `/uploads/${req.file.filename}`,
      };
    }
    await resume.update(resumeData);
    res.json(resume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    if (resume.personalInfo?.profilePicture) {
      fs.unlinkSync(path.join(__dirname, '..', resume.personalInfo.profilePicture));
    }
    await resume.destroy();
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};