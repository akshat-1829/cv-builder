// components/CVForm/TechnologiesInput.tsx

import React, { useState, KeyboardEvent } from 'react';
import { Box, Chip } from '@mui/material';
import { TextField } from '@cv-builder/ui-theme';

interface TechnologiesInputProps {
  name: string;
  label: string;
  value: string[];
  onChange: (technologies: string[]) => void;
  error?: boolean;
  helperText?: string;
  onBlur?: () => void;
}

const TechnologiesInput: React.FC<TechnologiesInputProps> = ({
  name,
  label,
  value = [],
  onChange,
  error,
  helperText,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTechnology();
    }
  };

  const addTechnology = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const handleDelete = (techToDelete: string) => {
    onChange(value.filter((tech) => tech !== techToDelete));
  };

  return (
    <Box>
      <TextField
        fullWidth
        name={name}
        label={label}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          addTechnology();
          onBlur?.();
        }}
        error={error}
        helperText={helperText || 'Press Enter or comma to add'}
        placeholder="Type and press Enter"
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        {value.map((tech, index) => (
          <Chip
            key={index}
            label={tech}
            onDelete={() => handleDelete(tech)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
};

export default TechnologiesInput;
