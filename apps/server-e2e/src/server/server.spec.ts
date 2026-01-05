import axios, { AxiosResponse } from 'axios';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    authProvider: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface CVResponse {
  _id: string;
  user: string;
  title: string;
  layout: string;
  data: any;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LayoutResponse {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  template: any;
  previewImage?: string;
  createdAt: string;
  updatedAt: string;
}

describe('CV Builder API E2E Tests', () => {
  let authToken: string;
  let testUserId: string;
  let testCVId: string;
  let testLayoutId: string;

  beforeAll(() => {
    axios.defaults.baseURL = 'http://localhost:5000';
  });

  const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'testpassword123',
    contactNumber: '1234567890',
  };

  const testCV = {
    title: 'Test CV',
    layout: 'default',
    data: {
      basic: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        pincode: '123456',
        intro: 'A brief introduction',
      },
      education: [
        {
          degree: 'Bachelor of Science',
          institution: 'Test University',
          percentage: '85%',
        },
      ],
      experience: [
        {
          organization: 'Test Company',
          location: 'Test City',
          position: 'Software Engineer',
          ctc: '50000',
          joiningDate: '2020-01-01',
          leavingDate: '2023-01-01',
          technologies: 'JavaScript, React, Node.js',
        },
      ],
      projects: [
        {
          title: 'Test Project',
          teamSize: 5,
          duration: '6 months',
          technologies: 'React, Node.js',
          description: 'A test project description',
        },
      ],
      skills: [
        {
          name: 'JavaScript',
          proficiency: 80,
        },
      ],
      social: [
        {
          platform: 'LinkedIn',
          link: 'https://linkedin.com/in/johndoe',
        },
      ],
    },
    isPublic: false,
  };

  const testLayout = {
    name: 'Modern Layout',
    slug: `modern-layout-${Date.now()}`,
    description: 'A modern CV layout',
    template: {
      sections: ['basic', 'education', 'experience', 'projects', 'skills', 'social'],
      styles: {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#000000',
      },
    },
    previewImage: 'https://example.com/preview.jpg',
  };

  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const response: AxiosResponse = await axios.get('/health');

      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.status).toBe('healthy');
      expect(response.data.environment).toBeDefined();
      expect(response.data.timestamp).toBeDefined();
      expect(response.data.uptime).toBeDefined();
    });
  });

  describe('Authentication', () => {
    describe('POST /api/auth/register', () => {
      it('should register a new user successfully', async () => {
        const response: AxiosResponse<ApiResponse<AuthResponse>> = await axios.post('/api/auth/register', testUser);

        expect(response.status).toBe(201);
        expect(response.data.success).toBe(true);
        expect(response.data.data.token).toBeDefined();
        expect(response.data.data.user.username).toBe(testUser.username);
        expect(response.data.data.user.email).toBe(testUser.email);
        expect(response.data.data.user.authProvider).toBe('local');

        authToken = response.data.data.token;
        testUserId = response.data.data.user.id;
      });

      it('should fail to register with existing email', async () => {
        const duplicateUser = {
          username: `another_${Date.now()}`,
          email: testUser.email,
          password: 'anotherpass123',
        };

        try {
          await axios.post('/api/auth/register', duplicateUser);
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(409);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('already registered');
        }
      });

      it('should fail to register with existing username', async () => {
        const duplicateUser = {
          username: testUser.username,
          email: `another_${Date.now()}@example.com`,
          password: 'anotherpass123',
        };

        try {
          await axios.post('/api/auth/register', duplicateUser);
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(409);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('already taken');
        }
      });
    });

    describe('POST /api/auth/login', () => {
      it('should login successfully with correct credentials', async () => {
        const loginData = {
          email: testUser.email,
          password: testUser.password,
        };

        const response: AxiosResponse<ApiResponse<AuthResponse>> = await axios.post('/api/auth/login', loginData);

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.data.token).toBeDefined();
        expect(response.data.data.user.email).toBe(testUser.email);

        authToken = response.data.data.token;
      });

      it('should fail login with wrong password', async () => {
        const loginData = {
          email: testUser.email,
          password: 'wrongpassword',
        };

        try {
          await axios.post('/api/auth/login', loginData);
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(401);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('Invalid email or password');
        }
      });

      it('should fail login with non-existent email', async () => {
        const loginData = {
          email: 'nonexistent@example.com',
          password: 'somepassword',
        };

        try {
          await axios.post('/api/auth/login', loginData);
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(401);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('Invalid email or password');
        }
      });
    });

    describe('GET /api/auth/me', () => {
      it('should get current user profile', async () => {
        const response: AxiosResponse<ApiResponse<any>> = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.data.id).toBe(testUserId);
        expect(response.data.data.username).toBe(testUser.username);
        expect(response.data.data.email).toBe(testUser.email);
        expect(response.data.data.contactNumber).toBe(testUser.contactNumber);
      });

      it('should fail without authentication', async () => {
        try {
          await axios.get('/api/auth/me');
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(401);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('Unauthorized');
        }
      });
    });

    describe('PUT /api/auth/profile', () => {
      it('should update user profile', async () => {
        const updateData = {
          username: `${testUser.username}_updated`,
          contactNumber: '0987654321',
        };

        const response: AxiosResponse<ApiResponse<any>> = await axios.put('/api/auth/profile', updateData, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.data.username).toBe(updateData.username);
        expect(response.data.data.contactNumber).toBe(updateData.contactNumber);

        // Update test user for cleanup
        testUser.username = updateData.username;
      });

      it('should fail to update with taken username', async () => {
        // First create another user
        const anotherUser = {
          username: `anotheruser_${Date.now()}`,
          email: `another_${Date.now()}@example.com`,
          password: 'anotherpass123',
        };

        await axios.post('/api/auth/register', anotherUser);

        const updateData = {
          username: anotherUser.username,
        };

        try {
          await axios.put('/api/auth/profile', updateData, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(409);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('already taken');
        }
      });
    });
  });

  describe('CV Operations', () => {
    describe('POST /api/cvs', () => {
      it('should create a new CV', async () => {
        const response: AxiosResponse<ApiResponse<CVResponse>> = await axios.post('/api/cvs', testCV, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(201);
        expect(response.data.success).toBe(true);
        expect(response.data.data.title).toBe(testCV.title);
        expect(response.data.data.layout).toBe(testCV.layout);
        expect(response.data.data.isPublic).toBe(testCV.isPublic);
        expect(response.data.data.user).toBe(testUserId);
        testCVId = response.data.data._id;
      });

      it('should fail without authentication', async () => {
        try {
          await axios.post('/api/cvs', testCV);
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(401);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('Not authenticated');
        }
      });
    });

    describe('GET /api/cvs', () => {
      it('should get all CVs for authenticated user', async () => {
        const response: AxiosResponse<ApiResponse<CVResponse[]>> = await axios.get('/api/cvs', {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(Array.isArray(response.data.data)).toBe(true);
        expect(response.data.data.length).toBeGreaterThan(0);
        expect(response.data.data[0].user).toBe(testUserId);
      });
    });

    describe('GET /api/cvs/:id', () => {
      it('should get a specific CV by ID', async () => {
        const response: AxiosResponse<ApiResponse<CVResponse>> = await axios.get(`/api/cvs/${testCVId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.data._id).toBe(testCVId);
        expect(response.data.data.title).toBe(testCV.title);
      });

      it('should fail for non-existent CV', async () => {
        try {
          await axios.get('/api/cvs/507f1f77bcf86cd799439011', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(404);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('CV not found');
        }
      });
    });

    describe('PUT /api/cvs/:id', () => {
      it('should update a CV', async () => {
        const updateData = {
          title: 'Updated Test CV',
          data: {
            ...testCV.data,
            basic: {
              ...testCV.data.basic,
              name: 'Jane Doe',
            },
          },
        };

        const response: AxiosResponse<ApiResponse<CVResponse>> = await axios.put(`/api/cvs/${testCVId}`, updateData, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.data.title).toBe(updateData.title);
        expect(response.data.data.data.basic.name).toBe('Jane Doe');
      });

      it('should fail to update CV owned by another user', async () => {
        // Create another user and CV
        const anotherUser = {
          username: `anotheruser2_${Date.now()}`,
          email: `another2_${Date.now()}@example.com`,
          password: 'anotherpass123',
        };

        const anotherUserResponse: AxiosResponse<AuthResponse> = await axios.post('/api/auth/register', anotherUser);
        const anotherToken = anotherUserResponse.data.token;

        const anotherCV = {
          title: 'Another CV',
          layout: 'default',
          data: {},
          isPublic: false,
        };

        const cvResponse: AxiosResponse<CVResponse> = await axios.post('/api/cvs', anotherCV, {
          headers: { Authorization: `Bearer ${anotherToken}` },
        });

        const anotherCVId = cvResponse.data.data._id;

        try {
          await axios.put(`/api/cvs/${anotherCVId}`, { title: 'Hacked Title' }, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(404);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('not found or not owned by user');
        }
      });
    });

    describe('DELETE /api/cvs/:id', () => {
      it('should delete a CV', async () => {
        const response: AxiosResponse<ApiResponse<null>> = await axios.delete(`/api/cvs/${testCVId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toContain('deleted successfully');
      });

      it('should fail to delete non-existent CV', async () => {
        try {
          await axios.delete('/api/cvs/507f1f77bcf86cd799439011', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(404);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('not found or not owned by user');
        }
      });
    });
  });

  describe('Layout Operations', () => {
    describe('POST /api/layouts', () => {
      it('should create a new layout', async () => {
        const response: AxiosResponse<ApiResponse<LayoutResponse>> = await axios.post('/api/layouts', testLayout, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(201);
        expect(response.data.success).toBe(true);
        expect(response.data.data.name).toBe(testLayout.name);
        expect(response.data.data.slug).toBe(testLayout.slug);
        expect(response.data.data.description).toBe(testLayout.description);

        testLayoutId = response.data.data._id;
      });

      it('should fail to create layout with existing slug', async () => {
        const duplicateLayout = {
          ...testLayout,
          name: 'Duplicate Layout',
        };

        try {
          await axios.post('/api/layouts', duplicateLayout, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(409);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('slug already exists');
        }
      });
    });

    describe('GET /api/layouts', () => {
      it('should get all layouts', async () => {
        const response: AxiosResponse<ApiResponse<LayoutResponse[]>> = await axios.get('/api/layouts');

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(Array.isArray(response.data.data)).toBe(true);
        expect(response.data.data.length).toBeGreaterThan(0);
      });
    });

    describe('GET /api/layouts/:id', () => {
      it('should get a specific layout by ID', async () => {
        const response: AxiosResponse<ApiResponse<LayoutResponse>> = await axios.get(`/api/layouts/${testLayoutId}`);

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.data._id).toBe(testLayoutId);
        expect(response.data.data.name).toBe(testLayout.name);
      });

      it('should fail for non-existent layout', async () => {
        try {
          await axios.get('/api/layouts/507f1f77bcf86cd799439011');
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.response.status).toBe(404);
          expect(error.response.data.success).toBe(false);
          expect(error.response.data.message).toContain('Layout not found');
        }
      });
    });

    describe('PUT /api/layouts/:id', () => {
      it('should update a layout', async () => {
        const updateData = {
          name: 'Updated Modern Layout',
          description: 'An updated modern CV layout',
        };

        const response: AxiosResponse<ApiResponse<LayoutResponse>> = await axios.put(`/api/layouts/${testLayoutId}`, updateData, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.data.name).toBe(updateData.name);
        expect(response.data.data.description).toBe(updateData.description);
      });
    });

    describe('DELETE /api/layouts/:id', () => {
      it('should delete a layout', async () => {
        const response: AxiosResponse<ApiResponse<null>> = await axios.delete(`/api/layouts/${testLayoutId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toContain('Layout deleted');
      });
    });
  });

  describe('Payment Operations', () => {
    describe('POST /api/payments/create', () => {
      it('should create a payment (stub implementation)', async () => {
        const paymentData = {
          amount: 500,
          currency: 'INR',
        };

        const response: AxiosResponse<ApiResponse<any>> = await axios.post('/api/payments/create', paymentData, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        // Since it's a stub, it might return mock data or a message about Stripe not being configured
        expect(response.data.data || response.data.message).toBeDefined();
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      try {
        await axios.get('/api/unknown-route');
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.success).toBe(false);
        expect(error.response.data.message).toContain('not found');
      }
    });

    it('should handle malformed JSON', async () => {
      try {
        await axios.post('/api/auth/register', '{invalid json}', {
          headers: { 'Content-Type': 'application/json' },
        });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        // Express should handle this
      }
    });
  });
});
