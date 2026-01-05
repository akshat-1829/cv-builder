// components/CVForm/AppDynamicFieldArray.tsx

import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { Box, Grid, IconButton, Divider, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../Button';

interface DynamicFieldArrayProps<T> {
  name: string;
  title: string;
  initialValue: T;
  renderFields: (index: number) => React.ReactNode;
}

export function AppDynamicFieldArray<T extends { id: string }>({
  name,
  title,
  initialValue,
  renderFields,
}: DynamicFieldArrayProps<T>): React.ReactElement {
  const { values } = useFormikContext<any>();
  const items = values[name] as T[];

  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <Box>
          {items && items.length > 0
            ? items.map((item: T, index: number) => (
                <Box key={item.id} sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">
                      {title} {index + 1}
                    </Typography>
                    {items.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => remove(index)}
                        aria-label={`Remove ${title} ${index + 1}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>

                  <Grid container spacing={3}>
                    {renderFields(index)}
                  </Grid>

                  {index < items.length - 1 && <Divider sx={{ mt: 3 }} />}
                </Box>
              ))
            : null}

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => push({ ...initialValue, id: uuidv4() })}
            sx={{ mt: 2 }}
            type="button"
          >
            Add {title}
          </Button>
        </Box>
      )}
    </FieldArray>
  );
}

