import React from 'react';
import {
  CVData,
  Skill,
  SocialProfile,
  Education,
  Experience,
  Project,
} from '@cv-builder/shared-types';
import './template2.css';
import { Box, Stack, Typography, Avatar, List, ListItem } from '@mui/material';
import { Chip } from '@cv-builder/ui-theme';

const CvTemplate2: React.FC<{ data: CVData }> = ({ data }) => {
  const {
    basicDetails: {
      image,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
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
    <Box className="template2-wrapper">
      <Box className="template2-container">
        {/* Header */}
        <Box className="template2-header">
          {image && (
            <Avatar
              src={image}
              alt="Profile"
              className="template2-profile-img"
              sx={{
                width: '130px',
                height: '130px',
                borderRadius: '25px',
              }}
            />
          )}
          <Box className="template2-header-text">
            <Typography
              variant="h1"
              textTransform="capitalize"
              className="template2-name"
            >
              {fullName}
            </Typography>
          </Box>
        </Box>

        <Box className="template2-content">
          <Box className="template2-left-column">
            {/* Contact */}
            <Box className="template2-section">
              <Typography variant="h6" className="template2-section-title">
                Contact
              </Typography>
              {phone && (
                <Box className="template2-contact-item">
                  <span role="img" aria-label="phone">
                    📱
                  </span>{' '}
                  {phone}
                </Box>
              )}
              {email && (
                <Box className="template2-contact-item">
                  <span role="img" aria-label="email">
                    📧
                  </span>{' '}
                  {email}
                </Box>
              )}
              {(address || city || state || pincode) && (
                <Box className="template2-contact-item">
                  <span
                    role="img"
                    aria-label="location"
                    style={{ textTransform: 'capitalize' }}
                  >
                    📍
                  </span>{' '}
                  {[address, city, state, pincode].filter(Boolean).join(', ')}
                </Box>
              )}
            </Box>

            {/* Profile */}
            <Box className="template2-section">
              <Typography variant="h6" className="template2-section-title">
                Profile
              </Typography>
              {summary ? (
                <Typography variant="body1" className="template2-profile-text">
                  {summary}
                </Typography>
              ) : (
                <Box className="template2-empty-state">No profile summary</Box>
              )}
            </Box>

            {/* Skills */}
            <Box className="template2-section">
              <Typography variant="h6" className="template2-section-title">
                Skills
              </Typography>
              {skills.length > 0 ? (
                <List className="template2-skills-list" sx={{ p: 0 }}>
                  {skills.map((skill: Skill, index: number) => (
                    <ListItem
                      key={index}
                      className="template2-skills-list-item"
                      sx={{ p: 0 }}
                    >
                      <Typography textTransform="capitalize">
                        {skill.name}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box className="template2-empty-state">No skills added</Box>
              )}
            </Box>

            {/* Social Profiles */}
            <Box className="template2-section">
              <Typography variant="h6" className="template2-section-title">
                Social
              </Typography>
              {socialProfiles.length > 0 ? (
                <Box>
                  {socialProfiles.map(
                    (social: SocialProfile, index: number) => (
                      <Box key={index} className="template2-social-item">
                        <Typography
                          variant="body2"
                          component="span"
                          className="template2-social-platform"
                          textTransform="capitalize"
                        >
                          {social.platform}
                        </Typography>
                        <a
                          href={social.url}
                          className="template2-social-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.url}
                        </a>
                      </Box>
                    ),
                  )}
                </Box>
              ) : (
                <Box className="template2-empty-state">No social profiles</Box>
              )}
            </Box>
          </Box>

          <Box className="template2-right-column">
            {/* Experience */}
            <Box className="template2-section">
              <Typography variant="h6" className="template2-section-title">
                Experience
              </Typography>
              {experience.length > 0 ? (
                <Box>
                  {experience.map((exp: Experience, index: number) => (
                    <Stack
                      spacing={0.5}
                      key={index}
                      className="template2-entry"
                    >
                      <Typography
                        variant="body1"
                        textTransform="capitalize"
                        className="template2-entry-title"
                      >
                        {exp.position}
                      </Typography>
                      <Typography
                        variant="body2"
                        textTransform="capitalize"
                        className="template2-entry-company"
                      >
                        {exp.organization}
                      </Typography>
                      {exp?.startDate && (
                        <Typography
                          variant="body2"
                          textTransform="capitalize"
                          className="template2-entry-dates"
                        >
                          {exp.startDate} - {exp.endDate || 'Present'}
                          {exp.location && ` | ${exp.location}`}
                        </Typography>
                      )}
                      {exp?.technologies && (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ mt: 1, display: 'block' }}
                        >
                          {exp.technologies.map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              customColor="#1a1a1a"
                              sx={{
                                fontSize: '9px',
                                height: '18px',
                                margin: '2px',
                              }}
                            />
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  ))}
                </Box>
              ) : (
                <Box className="template2-empty-state">No work experience</Box>
              )}
            </Box>

            {/* Education */}
            <Box className="template2-section">
              <Typography variant="h6" className="template2-section-title">
                Education
              </Typography>
              {education.length > 0 &&
              (education[0]?.institution || education[0]?.degree) ? (
                <Box>
                  {education.map((edu: Education, index: number) => (
                    <Box key={index} className="template2-entry">
                      <Typography
                        variant="body1"
                        className="template2-entry-title"
                        textTransform="capitalize"
                      >
                        {edu.degree}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="template2-entry-company"
                        textTransform="capitalize"
                      >
                        {edu.institution}
                      </Typography>
                      {edu?.startDate && (
                        <Typography
                          variant="body2"
                          className="template2-entry-dates"
                        >
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box className="template2-empty-state">
                  No education history
                </Box>
              )}
            </Box>

            {/* Projects */}
            <Box className="template2-section">
              <Typography variant="h6" className="template2-section-title">
                Projects
              </Typography>
              {projects.length > 0 ? (
                <Box>
                  {projects.map((project: Project, index: number) => (
                    <Stack
                      key={index}
                      spacing={0.5}
                      className="template2-entry"
                    >
                      <Typography
                        variant="body1"
                        className="template2-entry-title"
                        textTransform="capitalize"
                      >
                        {project.title}
                      </Typography>
                      {project.duration && (
                        <Typography
                          variant="body2"
                          className="template2-entry-dates"
                          textTransform="capitalize"
                        >
                          {project.duration}
                        </Typography>
                      )}
                      {project?.technologies && (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ mt: 1, display: 'block' }}
                        >
                          {project.technologies.map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              customColor="#1a1a1a"
                              sx={{
                                fontSize: '9px',
                                height: '18px',
                                margin: '2px',
                              }}
                            />
                          ))}
                        </Stack>
                      )}
                      {project.description && (
                        <Typography
                          variant="body1"
                          className="template2-entry-desc"
                        >
                          {project.description}
                        </Typography>
                      )}
                    </Stack>
                  ))}
                </Box>
              ) : (
                <Box className="template2-empty-state">No projects</Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CvTemplate2;
