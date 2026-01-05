// components/CVForm/AppTechnologiesInput.tsx

import React, { useState, KeyboardEvent, ChangeEvent, FocusEvent } from 'react';
import { Box, Chip } from '@mui/material';
import { TextField } from '../../TextFiled';

interface TechnologiesInputProps {
  name: string;
  label: string;
  value: string[];
  onChange: (technologies: string[]) => void;
  error?: boolean;
  helperText?: string;
  onBlur?: (e: FocusEvent<any>) => void;
  required?: boolean;
}

export const AppTechnologiesInput: React.FC<TechnologiesInputProps> = ({
  name,
  label,
  value = [],
  onChange,
  error,
  helperText,
  onBlur,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTechnology();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTechnology = () => {
    const trimmed = inputValue.trim().replace(/,$/, '');
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    } else if (trimmed) {
      setInputValue('');
    }
  };

  const handleDelete = (techToDelete: string) => {
    onChange(value.filter((tech) => tech !== techToDelete));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    addTechnology();
    onBlur?.(e);
  };

  return (
    <Box>
      <TextField
        fullWidth
        required={required}
        name={name}
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        error={error}
        helperText={helperText || 'Press Enter or comma to add'}
        placeholder="Type and press Enter"
      />
      {value && value.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {value.map((tech, index) => (
            <Chip
              key={`${tech}-${index}`}
              label={tech}
              onDelete={() => handleDelete(tech)}
              color="primary"
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

