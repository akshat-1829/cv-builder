// src/components/editor/TemplatePreview.tsx

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Paper, CircularProgress, Typography } from '@mui/material';
import { CVData } from '@cv-builder/shared-types';

interface TemplatePreviewProps {
  templateId: string;
  data: CVData;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  templateId,
  data,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [templateHTML, setTemplateHTML] = useState<string>('');

  // Template 1 specific functions
  const populateTemplate1Education = useCallback(
    (html: string, education: any[]): string => {
      if (education.length === 0) {
        return html.replace(
          /{{education}}/g,
          '<p class="empty-state">No education added yet</p>',
        );
      }

      const educationHTML = education
        .filter((edu) => edu.degree || edu.institution)
        .map(
          (edu) => `
        <div class="entry">
          <p class="entry-title">${edu.degree || 'Degree Name'}</p>
          <p class="entry-subtitle">${edu.institution || 'Institution Name'}</p>
          <p class="entry-meta">
            ${edu.percentage ? `Percentage: ${edu.percentage}%` : ''}
            ${edu.startDate ? `| ${edu.startDate}` : ''}
            ${edu.endDate ? `- ${edu.endDate}` : ''}
          </p>
        </div>
      `,
        )
        .join('');

      return html.replace(/{{education}}/g, educationHTML);
    },
    [],
  );

  const populateTemplate1Experience = useCallback(
    (html: string, experience: any[]): string => {
      if (experience.length === 0) {
        return html.replace(
          /{{experience}}/g,
          '<p class="empty-state">No experience added yet</p>',
        );
      }

      const experienceHTML = experience
        .filter((exp) => exp.position || exp.organization)
        .map(
          (exp) => `
        <div class="entry">
          <p class="entry-title">${exp.position || 'Position'}</p>
          <p class="entry-subtitle">${exp.organization || 'Company Name'}</p>
          <p class="entry-meta">
            Location: ${exp.location || 'N/A'}
            ${exp.ctc ? `| CTC: ${exp.ctc}` : ''}
            | ${exp.startDate || ''} - ${exp.endDate || 'Present'}
            ${exp.technologies && exp.technologies.length > 0 ? ` | Technologies: ${exp.technologies.join(', ')}` : ''}
          </p>
        </div>
      `,
        )
        .join('');

      return html.replace(/{{experience}}/g, experienceHTML);
    },
    [],
  );

  const populateTemplate1Projects = useCallback(
    (html: string, projects: any[]): string => {
      if (projects.length === 0) {
        return html.replace(
          /{{projects}}/g,
          '<p class="empty-state">No projects added yet</p>',
        );
      }

      const projectsHTML = projects
        .filter((proj) => proj.title)
        .map(
          (proj) => `
        <div class="entry">
          <p class="entry-title">${proj.title || 'Project Name'}</p>
          <p class="entry-meta">
            ${proj.teamSize ? `Team Size: ${proj.teamSize}` : ''}
            ${proj.duration ? `| Duration: ${proj.duration}` : ''}
            ${proj.technologies && proj.technologies.length > 0 ? ` | Technologies: ${proj.technologies.join(', ')}` : ''}
          </p>
          ${proj.description ? `<p class="entry-desc">${proj.description}</p>` : ''}
        </div>
      `,
        )
        .join('');

      return html.replace(/{{projects}}/g, projectsHTML);
    },
    [],
  );

  const populateTemplate1Skills = useCallback(
    (html: string, skills: any[]): string => {
      if (skills.length === 0) {
        return html.replace(
          /{{skills}}/g,
          '<p class="empty-state">No skills added yet</p>',
        );
      }

      const skillsHTML = skills
        .filter((skill) => skill.name)
        .map(
          (skill) => `
        <div class="skill-item">
          <span class="skill-name">${skill.name || 'Skill'}</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${skill.percentage || 0}%"></div>
          </div>
        </div>
      `,
        )
        .join('');

      return html.replace(/{{skills}}/g, skillsHTML);
    },
    [],
  );

  const populateTemplate1Social = useCallback(
    (html: string, profiles: any[]): string => {
      if (profiles.length === 0) {
        return html.replace(
          /{{socialProfiles}}/g,
          '<p class="empty-state">No social profiles added yet</p>',
        );
      }

      const profilesHTML = profiles
        .filter((profile) => profile.platform && profile.url)
        .map(
          (profile) => `
        <div class="social-item">
          <div class="social-platform">${profile.platform}</div>
          <a href="${profile.url}" class="social-link" target="_blank" rel="noopener noreferrer">
            ${profile.url}
          </a>
        </div>
      `,
        )
        .join('');

      return html.replace(/{{socialProfiles}}/g, profilesHTML);
    },
    [],
  );

  // Template 2 specific functions
  const populateTemplate2Skills = useCallback(
    (html: string, skills: any[]): string => {
      if (skills.length === 0) {
        return html.replace(
          /{{skills}}/g,
          '<p class="empty-state">No skills added yet</p>',
        );
      }

      const skillsHTML = `<ul class="skills-list">${skills
        .filter((skill) => skill.name)
        .map((skill) => `<li>${skill.name}</li>`)
        .join('')}</ul>`;

      return html.replace(/{{skills}}/g, skillsHTML);
    },
    [],
  );

  const populateTemplate2Education = useCallback(
    (html: string, education: any[]): string => {
      if (education.length === 0) {
        return html.replace(
          /{{education}}/g,
          '<p class="empty-state">No education added yet</p>',
        );
      }

      const educationHTML = education
        .filter((edu) => edu.degree || edu.institution)
        .map(
          (edu) => `
        <div class="entry">
          <h4 class="entry-title">${edu.degree || 'Degree Name'}</h4>
          <div class="entry-company">${edu.institution || 'Institution Name'}</div>
          <div class="entry-dates">${edu.startDate || ''} - ${edu.endDate || ''}</div>
          ${edu.percentage ? `<p class="entry-desc">Score: ${edu.percentage}%</p>` : ''}
        </div>
      `,
        )
        .join('');

      return html.replace(/{{education}}/g, educationHTML);
    },
    [],
  );

  const populateTemplate2Experience = useCallback(
    (html: string, experience: any[]): string => {
      if (experience.length === 0) {
        return html.replace(
          /{{experience}}/g,
          '<p class="empty-state">No experience added yet</p>',
        );
      }

      const experienceHTML = experience
        .filter((exp) => exp.position || exp.organization)
        .map(
          (exp) => `
        <div class="entry">
          <h4 class="entry-title">${exp.position || 'Position'}</h4>
          <div class="entry-company">${exp.organization || 'Company'} ${exp.location ? `/ ${exp.location}` : ''}</div>
          <div class="entry-dates">${exp.startDate || ''} - ${exp.endDate || 'Present'}</div>
          ${exp.ctc ? `<p class="entry-desc">CTC: ${exp.ctc}</p>` : ''}
          ${exp.technologies && exp.technologies.length > 0 ? `<p class="entry-desc">Technologies: ${exp.technologies.join(', ')}</p>` : ''}
        </div>
      `,
        )
        .join('');

      return html.replace(/{{experience}}/g, experienceHTML);
    },
    [],
  );

  const populateTemplate2Projects = useCallback(
    (html: string, projects: any[]): string => {
      if (projects.length === 0) {
        return html.replace(
          /{{projects}}/g,
          '<p class="empty-state">No projects added yet</p>',
        );
      }

      const projectsHTML = projects
        .filter((proj) => proj.title)
        .map(
          (proj) => `
        <div class="entry">
          <h4 class="entry-title">${proj.title || 'Project Name'}</h4>
          <div class="entry-company">
            ${proj.teamSize ? `Team: ${proj.teamSize}` : ''}
            ${proj.duration ? `| Duration: ${proj.duration}` : ''}
            ${proj.technologies && proj.technologies.length > 0 ? `| Tech: ${proj.technologies.join(', ')}` : ''}
          </div>
          ${proj.description ? `<p class="entry-desc">${proj.description}</p>` : ''}
        </div>
      `,
        )
        .join('');

      return html.replace(/{{projects}}/g, projectsHTML);
    },
    [],
  );

  const populateTemplate2Social = useCallback(
    (html: string, profiles: any[]): string => {
      if (profiles.length === 0) {
        return html.replace(
          /{{socialProfiles}}/g,
          '<p class="empty-state">No social profiles added yet</p>',
        );
      }

      const profilesHTML = profiles
        .filter((profile) => profile.platform && profile.url)
        .map(
          (profile) => `
        <div class="social-item">
          <div class="social-platform">${profile.platform}</div>
          <a href="${profile.url}" class="social-link" target="_blank" rel="noopener noreferrer">
            ${profile.url}
          </a>
        </div>
      `,
        )
        .join('');

      return html.replace(/{{socialProfiles}}/g, profilesHTML);
    },
    [],
  );

  // Template 3 specific functions
  const populateTemplate3Experience = useCallback(
    (html: string, experience: any[]): string => {
      if (experience.length === 0) {
        return html.replace(
          /{{experience}}/g,
          '<p class="empty-state">No experience added yet</p>',
        );
      }

      const experienceHTML = experience
        .filter((exp) => exp.position || exp.organization)
        .map(
          (exp) => `
        <div class="experience-item">
          <div class="experience-header">
            <div class="company-info">
              <div class="company-name">${exp.organization || 'Company Name'}</div>
              <div class="job-title">${exp.position || 'Position'}</div>
            </div>
            <div class="location-date">
              <div class="location">${exp.location || ''}</div>
              <div class="date-range">${exp.startDate || ''} - ${exp.endDate || 'Present'}</div>
            </div>
          </div>
          ${
            exp.ctc || exp.technologies
              ? `
            <ul class="responsibilities">
              ${exp.ctc ? `<li><strong>CTC:</strong> ${exp.ctc}</li>` : ''}
              ${exp.technologies && exp.technologies.length > 0 ? `<li><strong>Technologies:</strong> ${exp.technologies.join(', ')}</li>` : ''}
            </ul>
          `
              : ''
          }
        </div>
      `,
        )
        .join('');

      return html.replace(/{{experience}}/g, experienceHTML);
    },
    [],
  );

  const populateTemplate3Projects = useCallback(
    (html: string, projects: any[]): string => {
      if (projects.length === 0) {
        return html.replace(
          /{{projects}}/g,
          '<p class="empty-state">No projects added yet</p>',
        );
      }

      const projectsHTML = projects
        .filter((proj) => proj.title)
        .map(
          (proj) => `
        <div class="project-item">
          <div class="project-header">
            <span class="project-tech">${proj.title}:</span>
            ${proj.technologies && proj.technologies.length > 0 ? proj.technologies.join(', ') : ''}
          </div>
          ${
            proj.teamSize || proj.duration
              ? `
            <div class="project-meta">
              ${proj.teamSize ? `Team: ${proj.teamSize}` : ''}
              ${proj.duration ? `| Duration: ${proj.duration}` : ''}
            </div>
          `
              : ''
          }
          ${proj.description ? `<p class="project-desc">${proj.description}</p>` : ''}
        </div>
      `,
        )
        .join('');

      return html.replace(/{{projects}}/g, projectsHTML);
    },
    [],
  );

  const populateTemplate3Education = useCallback(
    (html: string, education: any[]): string => {
      if (education.length === 0) {
        return html.replace(
          /{{education}}/g,
          '<p class="empty-state">No education added yet</p>',
        );
      }

      const educationHTML = education
        .filter((edu) => edu.degree || edu.institution)
        .map(
          (edu) => `
        <div class="education-item">
          <div class="education-header">
            <div>
              <div class="university-name">${edu.institution || 'Institution Name'}</div>
              <div class="degree">${edu.degree || 'Degree Name'}</div>
            </div>
            <div class="edu-info">
              ${edu.percentage ? `<div class="cgpa">Score: ${edu.percentage}%</div>` : ''}
              <div class="date-range">${edu.startDate || ''} - ${edu.endDate || ''}</div>
            </div>
          </div>
        </div>
      `,
        )
        .join('');

      return html.replace(/{{education}}/g, educationHTML);
    },
    [],
  );

  const populateTemplate3Skills = useCallback(
    (html: string, skills: any[]): string => {
      if (skills.length === 0) {
        return html.replace(
          /{{skills}}/g,
          '<p class="empty-state">No skills added yet</p>',
        );
      }

      const skillsList = skills
        .filter((skill) => skill.name)
        .map((skill) => skill.name)
        .join(', ');
      const skillsHTML = `
      <div class="skills-content">
        <div class="skill-category">
          <span class="skill-label">Skills:</span>
          <span class="skill-list">${skillsList}</span>
        </div>
      </div>
    `;

      return html.replace(/{{skills}}/g, skillsHTML);
    },
    [],
  );

  const populateTemplate = useCallback(
    (html: string, data: CVData, templateId: string): string => {
      let populated = html;

      // Basic Details - Common for all templates
      populated = populated.replace(
        /{{firstName}}/g,
        data.basicDetails.firstName || '',
      );
      populated = populated.replace(
        /{{lastName}}/g,
        data.basicDetails.lastName || '',
      );
      populated = populated.replace(
        /{{fullName}}/g,
        `${data.basicDetails.firstName} ${data.basicDetails.lastName}`.trim() ||
          'Your Name',
      );
      populated = populated.replace(
        /{{email}}/g,
        data.basicDetails.email || 'email@example.com',
      );
      populated = populated.replace(
        /{{phone}}/g,
        data.basicDetails.phone || '+00-000-000-000',
      );
      populated = populated.replace(
        /{{address}}/g,
        data.basicDetails.address || '',
      );
      populated = populated.replace(/{{city}}/g, data.basicDetails.city || '');
      populated = populated.replace(
        /{{state}}/g,
        data.basicDetails.state || '',
      );
      populated = populated.replace(
        /{{pincode}}/g,
        data.basicDetails.pincode || '',
      );
      populated = populated.replace(
        /{{summary}}/g,
        data.basicDetails.summary || 'Add your professional summary here...',
      );

      // Handle image
      if (data.basicDetails.image) {
        populated = populated.replace(/{{image}}/g, data.basicDetails.image);
        populated = populated.replace(/{{imageDisplay}}/g, 'block');
      } else {
        populated = populated.replace(
          /{{image}}/g,
          'https://via.placeholder.com/150',
        );
        populated = populated.replace(/{{imageDisplay}}/g, 'none');
      }

      // Template-specific population
      if (templateId === 'template_1') {
        populated = populateTemplate1Education(populated, data.education);
        populated = populateTemplate1Experience(populated, data.experience);
        populated = populateTemplate1Projects(populated, data.projects);
        populated = populateTemplate1Skills(populated, data.skills);
        populated = populateTemplate1Social(populated, data.socialProfiles);
      } else if (templateId === 'template_2') {
        populated = populateTemplate2Education(populated, data.education);
        populated = populateTemplate2Experience(populated, data.experience);
        populated = populateTemplate2Projects(populated, data.projects);
        populated = populateTemplate2Skills(populated, data.skills);
        populated = populateTemplate2Social(populated, data.socialProfiles);
      } else if (templateId === 'template_3') {
        populated = populateTemplate3Education(populated, data.education);
        populated = populateTemplate3Experience(populated, data.experience);
        populated = populateTemplate3Projects(populated, data.projects);
        populated = populateTemplate3Skills(populated, data.skills);
      }

      return populated;
    },
    [
      populateTemplate1Education,
      populateTemplate1Experience,
      populateTemplate1Projects,
      populateTemplate1Skills,
      populateTemplate1Social,
      populateTemplate2Education,
      populateTemplate2Experience,
      populateTemplate2Projects,
      populateTemplate2Skills,
      populateTemplate2Social,
      populateTemplate3Education,
      populateTemplate3Experience,
      populateTemplate3Projects,
      populateTemplate3Skills,
    ],
  );

  // Fetch and populate template
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);
        setError(false);

        console.log('Fetching template:', templateId);

        const response = await fetch(`/templates/${templateId}.html`);
        if (!response.ok) {
          console.error('Template fetch failed:', response.status);
          throw new Error('Template not found');
        }

        let html = await response.text();
        console.log('Template fetched successfully');

        // Populate template with data
        html = populateTemplate(html, data, templateId);

        setTemplateHTML(html);
        setLoading(false);
      } catch (err) {
        console.error('Error loading template:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId, data, populateTemplate]);

  // Inject HTML into iframe after it mounts
  useEffect(() => {
    if (!templateHTML || !iframeRef.current) {
      return;
    }

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDoc) {
      console.log('Injecting HTML into iframe');
      iframeDoc.open();
      iframeDoc.write(templateHTML);
      iframeDoc.close();
      console.log('HTML injected successfully');
    }
  }, [templateHTML]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          minHeight: '600px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          minHeight: '600px',
          gap: 2,
        }}
      >
        <Typography color="error" variant="h6">
          Failed to load template
        </Typography>
        <Typography color="text.secondary">
          Please try again or select a different template
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '210mm',
          minHeight: '297mm',
          maxWidth: '100%',
          bgcolor: 'white',
          overflow: 'visible',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <iframe
          ref={iframeRef}
          title="CV Preview"
          style={{
            width: '100%',
            height: '297mm',
            minHeight: '297mm',
            border: 'none',
            display: 'block',
            backgroundColor: 'white',
          }}
        />
      </Paper>
    </Box>
  );
};

export default TemplatePreview;
