# Application Optimization Guidelines

## Overview
This document outlines the optimization strategies implemented across the CV Builder application to improve performance, maintainability, and code reusability.

## 1. Component Architecture

### Memoization with React.memo
- **When to use:** Components that receive the same props frequently and shouldn't re-render unnecessarily
- **Example:**
```tsx
export default React.memo(ComponentName);
```
- **Applied to:** CVFormContent, MyCVs, CVEditor, CVCard

### Functional Components with Hooks
- Prefer functional components over class components
- Use custom hooks to encapsulate business logic
- Keep components focused and single-responsibility

## 2. State Management

### Custom Hooks for Common Patterns
Created reusable hooks to manage recurring state patterns:

#### useSnackbar
Manages snackbar/toast notifications:
```tsx
const { snackbar, showSnackbar, showSuccess, showError, closeSnackbar } = useSnackbar();
```

#### useDialog
Manages dialog open/close state with optional data:
```tsx
const { open, data, openDialog, closeDialog } = useDialog();
```

#### useBeforeUnload
Handles unsaved changes warning:
```tsx
useBeforeUnload(hasUnsavedChanges, 'Custom message');
```

#### useCvEditor
Encapsulates all CV Editor logic and state management:
```tsx
const {
  templateId,
  cvId,
  initialFormValues,
  createMutation,
  updateMutation,
  handleSave,
  handleNavigateBack,
  ...
} = useCvEditor();
```

### Consolidation Principles
- Consolidate related state into custom hooks instead of multiple useState calls
- Use useReducer for complex state logic
- Avoid prop drilling with context or custom hooks

## 3. Performance Optimizations

### useMemo for Expensive Computations
```tsx
const cvs: CV[] = useMemo(
  () => Array.isArray(cvData?.data) ? cvData.data : [],
  [cvData?.data]
);
```

### useCallback for Function Stability
```tsx
const handleEdit = useCallback((cvId: string, templateId?: string) => {
  navigate(`/editor?template=${templateId || 'template_1'}&cvId=${cvId}`);
}, [navigate]);
```

### Dependency Array Management
- Always include all dependencies in useMemo and useCallback
- Use dependency arrays to prevent unnecessary re-computations
- Be careful with object/array literals in dependencies

### Constant Declarations
```tsx
// Good: Declared outside component
const STEPS = ['Basic Details', 'Education', ...] as const;

// Bad: Declared inside component (recreated on every render)
const steps = ['Basic Details', 'Education', ...];
```

## 4. Reusable Components

### Common Components Library
Located in `src/components/Common/`:

#### ErrorAlert
Consolidated error display component:
```tsx
<ErrorAlert
  message="Error message"
  onClose={handleClose}
  onRetry={handleRetry}
  showRetry={true}
/>
```

#### SnackbarNotification
Centralized snackbar component:
```tsx
<SnackbarNotification
  open={snackbar.open}
  message={snackbar.message}
  severity={snackbar.severity}
  onClose={closeSnackbar}
/>
```

#### LoadingState
Reusable loading indicator:
```tsx
<LoadingState
  loading={isLoading}
  message="Loading..."
  spinner={true}
/>
```

#### EmptyState
Empty state placeholder:
```tsx
<EmptyState
  title="No CVs created yet"
  description="Start building..."
  actionLabel="Create First CV"
  onAction={handleCreate}
/>
```

## 5. React Query Optimization

### Query Key Management
Use hierarchical query keys:
```tsx
export const CV_QUERY_KEYS = {
  all: ['cvs'] as const,
  lists: () => [...CV_QUERY_KEYS.all, 'list'] as const,
  list: (params) => [...CV_QUERY_KEYS.lists(), params] as const,
  details: () => [...CV_QUERY_KEYS.all, 'detail'] as const,
  detail: (id) => [...CV_QUERY_KEYS.details(), id] as const,
} as const;
```

### Automatic Cache Invalidation
```tsx
onSuccess: (data, variables) => {
  queryClient.invalidateQueries(CV_QUERY_KEYS.lists());
  queryClient.invalidateQueries(CV_QUERY_KEYS.detail(variables.id));
  options?.onSuccess?.(data, variables);
}
```

### Stale Time Configuration
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      cacheTime: 10 * 60 * 1000,     // 10 minutes
      retry: 2,
    },
  },
});
```

## 6. Code Organization

### Service Layer
- Centralize API calls in service modules
- Export both raw API functions and custom hooks
- Example: `apps/web/src/services/cv.service.ts`

### Business Logic Extraction
- Extract complex logic into custom hooks
- Keep components focused on rendering
- Example: `useCvEditor.ts`

### File Structure
```
apps/web/src/
├── components/       # Reusable UI components
│   ├── Common/       # Shared components (ErrorAlert, LoadingState, etc.)
│   ├── Dashboard/    # Dashboard-specific components
│   └── ...
├── hooks/            # Custom hooks (useSnackbar, useCvEditor, etc.)
├── pages/            # Page components
├── services/         # API services with React Query hooks
├── utils/            # Utility functions
└── ...
```

## 7. Best Practices

### TypeScript Usage
- Use proper TypeScript typing for all props and state
- Avoid `any` type; use `unknown` with type guards
- Use discriminated unions for better type safety

### Error Handling
```tsx
const error = queryError as Error | null;
const errorMessage = error instanceof Error 
  ? error.message 
  : 'Default error message';
```

### Component Props
- Use object destructuring for props
- Define prop interfaces for better documentation
- Separate UI props from business logic props

### Naming Conventions
- Use camelCase for variables and functions
- Use PascalCase for components
- Use CONSTANT_CASE for constants
- Prefix boolean variables with `is`, `has`, `should`

## 8. Bundle Size Optimization

### Code Splitting
- Use React.lazy() for route-based code splitting
- Load components only when needed

### Import Optimization
- Prefer named imports from barrel exports
- Use barrel exports (index.ts) to organize modules

## 9. Testing Considerations

### Memoization
- Test that memoized components don't re-render unnecessarily
- Verify dependency arrays are correct

### Custom Hooks
- Test custom hooks with renderHook from @testing-library/react
- Verify hooks return expected values and handle edge cases

### React Query
- Mock React Query in tests
- Test mutation and query behavior
- Verify cache invalidation works correctly

## 10. Performance Monitoring

### Key Metrics
- Component render count and timing
- API call frequency and caching effectiveness
- Bundle size and code split distribution

### Tools
- React DevTools Profiler
- Chrome DevTools Performance tab
- Lighthouse for Core Web Vitals

## Implementation Checklist

- [x] Custom hooks for state management (useSnackbar, useDialog, useCvEditor)
- [x] Reusable components (ErrorAlert, SnackbarNotification, LoadingState, EmptyState)
- [x] Memoization on components (React.memo)
- [x] useCallback for event handlers
- [x] useMemo for expensive computations
- [x] React Query integration with proper caching
- [x] Type-safe error handling
- [x] Service layer optimization
- [ ] Route-based code splitting with React.lazy
- [ ] Performance monitoring setup
- [ ] Bundle size analysis
- [ ] Component interaction tests

## Future Improvements

1. **Code Splitting:** Implement lazy loading for routes
2. **Virtual Lists:** Use virtualization for large lists
3. **Image Optimization:** Implement image lazy loading and optimization
4. **API Caching:** Add persistent caching (localStorage/IndexedDB)
5. **Error Boundaries:** Add error boundary components
6. **Suspense:** Use React Suspense for loading states
7. **Performance Metrics:** Integrate Web Vitals monitoring

## References

- [React Hooks Documentation](https://react.dev/reference/react)
- [React Query Documentation](https://tanstack.com/query/latest)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
