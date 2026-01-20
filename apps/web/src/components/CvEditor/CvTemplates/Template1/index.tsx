import React from 'react';
import {
  CVData,
  Skill,
  SocialProfile,
  Education,
  Experience,
  Project,
} from '@cv-builder/shared-types';
import './template1.css';
import {
  Box,
  Stack,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Chip } from '@cv-builder/ui-theme';

const CvTemplate1: React.FC<{ data: CVData }> = ({ data }) => {
  const {
    basicDetails: {
      image,
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      summary,
    },
    skills = [],
    socialProfiles = [],
    education = [],
    experience = [],
    projects = [],
  } = data;

  const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Your Name';

  return (
    <Box className="cv-wrapper">
      <Box className="cv-container">
        {/* Header */}
        <Box className="header">
          {image && (
            <Avatar src={image} alt="Profile" className="profile-img" />
          )}
          <Typography
            variant="h4"
            className="basic-name"
            sx={{ fontSize: '28px', margin: '0 0 5px' }}
          >
            {fullName || 'Your Name'}
          </Typography>
          <Box className="basic-contact">
            {email && (
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                <span role="img" aria-label="email">
                  📧
                </span>{' '}
                {email}
              </Typography>
            )}
            {phone && (
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                <span role="img" aria-label="phone">
                  📱
                </span>{' '}
                {phone}
              </Typography>
            )}
            {(city || state) && (
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                <span role="img" aria-label="location">
                  📍
                </span>{' '}
                {[city, state].filter(Boolean).join(', ')}
              </Typography>
            )}
          </Box>
        </Box>

        <Box className="content">
          <Box className="left-column">
            {/* Profile */}
            <Box className="section">
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#0d9488',
                    fontSize: '16px',
                    margin: '0 0 15px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    position: 'relative',
                  }}
                >
                  Profile
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40px',
                    height: '2px',
                    background: '#0d9488',
                  }}
                />
              </Box>
              {summary ? (
                <Typography variant="body1" className="profile-para">
                  {summary}
                </Typography>
              ) : (
                <Box className="empty-state">No profile summary</Box>
              )}
            </Box>

            {/* Skills */}
            <Box className="section">
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#0d9488',
                    fontSize: '16px',
                    margin: '0 0 15px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    position: 'relative',
                  }}
                >
                  Skills
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40px',
                    height: '2px',
                    background: '#0d9488',
                  }}
                />
              </Box>
              {skills.length > 0 ? (
                <Box>
                  {skills.map((skill: Skill, index: number) => (
                    <Stack spacing={1} key={index} className="skill-item">
                      <Typography variant="body2" className="skill-name">
                        {skill.name}
                      </Typography>
                      <Box className="progress-bar">
                        <Box
                          className="progress-fill"
                          sx={{ width: `${skill.percentage || 0}%` }}
                        />
                      </Box>
                    </Stack>
                  ))}
                </Box>
              ) : (
                <Box className="empty-state">No skills added</Box>
              )}
            </Box>

            {/* Social Profiles */}
            <Box className="section">
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#0d9488',
                    fontSize: '16px',
                    margin: '0 0 15px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    position: 'relative',
                  }}
                >
                  Social Profiles
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40px',
                    height: '2px',
                    background: '#0d9488',
                  }}
                />
              </Box>
              {socialProfiles.length > 0 ? (
                <List className="social-list" sx={{ p: 0 }}>
                  {socialProfiles.map(
                    (social: SocialProfile, index: number) => (
                      <ListItem
                        key={index}
                        className="social-item"
                        sx={{ p: 0 }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              <Typography
                                variant="body2"
                                component="span"
                                className="social-platform"
                              >
                                {social.platform}:{' '}
                              </Typography>
                              <a
                                href={social.url}
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {social.url}
                              </a>
                            </Typography>
                          }
                        />
                      </ListItem>
                    ),
                  )}
                </List>
              ) : (
                <Box className="empty-state">No social profiles</Box>
              )}
            </Box>
          </Box>

          <Box className="right-column">
            {/* Education */}
            <Box className="section">
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#0d9488',
                    fontSize: '16px',
                    margin: '0 0 15px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    position: 'relative',
                  }}
                >
                  Education
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40px',
                    height: '2px',
                    background: '#0d9488',
                  }}
                />
              </Box>
              {education.length > 0 &&
              (education[0]?.institution || education[0]?.degree) ? (
                <Box>
                  {education.map((edu: Education, index: number) => (
                    <Box key={index} className="entry">
                      <Typography variant="body1" className="entry-title">
                        {edu.degree}
                      </Typography>
                      <Typography variant="body2" className="entry-subtitle">
                        {edu.institution}
                      </Typography>
                      {edu?.startDate && (
                        <Typography variant="body2" className="entry-meta">
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box className="empty-state">No education history</Box>
              )}
            </Box>

            {/* Experience */}
            <Box className="section">
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#0d9488',
                    fontSize: '16px',
                    margin: '0 0 15px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    position: 'relative',
                  }}
                >
                  Experience
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40px',
                    height: '2px',
                    background: '#0d9488',
                  }}
                />
              </Box>
              {experience.length > 0 ? (
                <Box>
                  {experience.map((exp: Experience, index: number) => (
                    <Stack spacing={1} key={index} className="entry">
                      <Typography
                        variant="body1"
                        textTransform="capitalize"
                        className="entry-title"
                      >
                        {exp.position}
                      </Typography>
                      <Typography
                        variant="body2"
                        textTransform="capitalize"
                        className="entry-subtitle"
                      >
                        {exp.organization}
                      </Typography>
                      {exp?.startDate && (
                        <Typography
                          variant="body2"
                          textTransform="capitalize"
                          className="entry-meta"
                        >
                          {exp.startDate} - {exp.endDate || 'Present'}
                          {exp.location && ` | ${exp.location}`}
                        </Typography>
                      )}
                      {exp?.technologies && (
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ margin: 3, display: 'block' }}
                        >
                          {exp.technologies.map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              customColor="#0d9488"
                            />
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  ))}
                </Box>
              ) : (
                <Box className="empty-state">No work experience</Box>
              )}
            </Box>

            {/* Projects */}
            <Box className="section">
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#0d9488',
                    fontSize: '16px',
                    margin: '0 0 15px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    position: 'relative',
                  }}
                >
                  Projects
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40px',
                    height: '2px',
                    background: '#0d9488',
                  }}
                />
              </Box>
              {projects.length > 0 ? (
                <Box>
                  {projects.map((project: Project, index: number) => (
                    <Stack key={index} spacing={1} className="entry">
                      <Typography variant="body1" className="entry-title">
                        {project.title}
                      </Typography>
                      {project.duration && (
                        <Typography variant="body2" className="entry-meta">
                          {project.duration}
                        </Typography>
                      )}
                      {project?.technologies && (
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ display: 'block' }}
                        >
                          {project.technologies.map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              customColor="#0d9488"
                            />
                          ))}
                        </Stack>
                      )}
                      {project.description && (
                        <Typography variant="body1" className="entry-desc">
                          {project.description}
                        </Typography>
                      )}
                    </Stack>
                  ))}
                </Box>
              ) : (
                <Box className="empty-state">No projects</Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CvTemplate1;
