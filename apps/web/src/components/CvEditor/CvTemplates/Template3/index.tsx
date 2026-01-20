import React from 'react';
import {
  CVData,
  Skill,
  Education,
  Experience,
  Project,
} from '@cv-builder/shared-types';
import './template3.css';
import { Box, Stack, Typography } from '@mui/material';
import { Chip } from '@cv-builder/ui-theme';

const CvTemplate3: React.FC<{ data: CVData }> = ({ data }) => {
  const {
    basicDetails: { firstName, lastName, email, phone, city, state, summary },
    skills = [],
    education = [],
    experience = [],
    projects = [],
  } = data;

  const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Your Name';

  return (
    <Box className="template3-wrapper">
      <Box className="template3-container">
        {/* Header */}
        <Box className="template3-header">
          <Typography
            variant="h1"
            textTransform="capitalize"
            className="template3-name"
          >
            {fullName}
          </Typography>
          <Box className="template3-contact-info">
            {email && (
              <Box className="template3-contact-item">
                <strong>Email:</strong> <span>{email}</span>
              </Box>
            )}
            {phone && (
              <Box className="template3-contact-item">
                <strong>Mobile:</strong> <span>{phone}</span>
              </Box>
            )}
            {(city || state) && (
              <Box className="template3-contact-item">
                <Typography textTransform="capitalize">
                  <strong>Location:</strong>{' '}
                  <span>{[city, state].filter(Boolean).join(', ')}</span>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Professional Summary */}
        <Box className="template3-section">
          <Typography variant="h2" className="template3-section-title">
            Professional Summary
          </Typography>
          {summary ? (
            <Box className="template3-summary-content">
              <Typography variant="body1">{summary}</Typography>
            </Box>
          ) : (
            <Box className="template3-empty-state">No professional summary</Box>
          )}
        </Box>

        {/* Experience */}
        <Box className="template3-section">
          <Typography variant="h2" className="template3-section-title">
            Experience
          </Typography>
          {experience.length > 0 ? (
            <Box>
              {experience.map((exp: Experience, index: number) => (
                <Box key={index} className="template3-experience-item">
                  <Box className="template3-experience-header">
                    <Box className="template3-company-info">
                      <Typography
                        variant="body1"
                        className="template3-company-name"
                        textTransform="capitalize"
                      >
                        {exp.organization}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="template3-job-title"
                        textTransform="capitalize"
                      >
                        {exp.position}
                      </Typography>
                    </Box>
                    <Box className="template3-location-date">
                      {exp.location && (
                        <Typography
                          variant="body2"
                          className="template3-location"
                          textTransform="capitalize"
                        >
                          {exp.location}
                        </Typography>
                      )}
                      {exp?.startDate && (
                        <Typography
                          variant="body2"
                          className="template3-date-range"
                          textTransform="capitalize"
                        >
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  {exp?.technologies && exp.technologies.length > 0 && (
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mt: 1, mb: 1, display: 'block' }}
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
                </Box>
              ))}
            </Box>
          ) : (
            <Box className="template3-empty-state">No work experience</Box>
          )}
        </Box>

        {/* Projects */}
        <Box className="template3-section">
          <Typography variant="h2" className="template3-section-title">
            Projects
          </Typography>
          {projects.length > 0 ? (
            <Box>
              {projects.map((project: Project, index: number) => (
                <Box key={index} className="template3-project-item">
                  <Typography
                    variant="body1"
                    className="template3-project-header"
                    textTransform="capitalize"
                  >
                    {project.title}
                  </Typography>
                  {project.duration && (
                    <Typography
                      variant="body2"
                      className="template3-project-meta"
                      textTransform="capitalize"
                    >
                      {project.duration}
                    </Typography>
                  )}
                  {project?.technologies && project.technologies.length > 0 && (
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mt: 0.5, mb: 0.5, display: 'block' }}
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
                      className="template3-project-desc"
                    >
                      {project.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <Box className="template3-empty-state">No projects</Box>
          )}
        </Box>

        {/* Education */}
        <Box className="template3-section">
          <Typography variant="h2" className="template3-section-title">
            Education
          </Typography>
          {education.length > 0 &&
          (education[0]?.institution || education[0]?.degree) ? (
            <Box>
              {education.map((edu: Education, index: number) => (
                <Box key={index} className="template3-education-item">
                  <Box className="template3-education-header">
                    <Box>
                      <Typography
                        variant="body1"
                        className="template3-university-name"
                        textTransform="capitalize"
                      >
                        {edu.institution}
                      </Typography>
                      <Typography
                        variant="body2"
                        textTransform="capitalize"
                        className="template3-degree"
                      >
                        {edu.degree}
                      </Typography>
                    </Box>
                    <Box className="template3-edu-info">
                      {edu?.startDate && (
                        <Typography
                          variant="body2"
                          className="template3-date-range"
                        >
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </Typography>
                      )}
                      {edu?.percentage && (
                        <Typography variant="body2" className="template3-cgpa">
                          {edu.percentage}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box className="template3-empty-state">No education history</Box>
          )}
        </Box>

        {/* Skills */}
        <Box className="template3-section">
          <Typography variant="h2" className="template3-section-title">
            Skills
          </Typography>
          {skills.length > 0 ? (
            <Box className="template3-skills-content">
              <Box className="template3-skill-category">
                <Typography
                  variant="body2"
                  component="span"
                  className="template3-skill-label"
                >
                  Technical Skills:{' '}
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  className="template3-skill-list"
                  textTransform="capitalize"
                >
                  {skills.map((skill: Skill) => skill.name).join(', ')}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box className="template3-empty-state">No skills added</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CvTemplate3;
