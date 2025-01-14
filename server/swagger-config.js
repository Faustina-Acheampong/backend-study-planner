import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Study Planner API',
    version: '1.0.0',
    description: 'API for managing courses in the Study Planner application',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8000}`, 
      description: 'Local development server',
    },
  ],
  components: {
    schemas: {
      Course: {
        type: 'object',
        required: [
          'course_name',
          'course_day',
          'course_code',
          'course_instructor',
          'course_time',
          'user_id',
          'course_status',
        ],
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the course',
          },
          course_name: {
            type: 'string',
            description: 'Name of the course',
            maxLength: 250,
          },
          course_day: {
            type: 'string',
            description: 'Day the course is held',
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          },
          course_code: {
            type: 'string',
            description: 'Unique code for the course, e.g., AB1234',
            pattern: '^[A-Z]{2}[0-9]{4}$',
          },
          course_instructor: {
            type: 'string',
            description: 'Name of the instructor',
            maxLength: 250,
          },
          course_semester: {
            type: 'string',
            description: 'Semester of the course, e.g., Autumn-1',
            pattern: '^(Autumn|Winter|Spring|Summer)-([1-9]|10)$',
          },
          course_location: {
            type: 'string',
            description: 'Location of the course',
            maxLength: 250,
          },
          course_cover_image: {
            type: 'string',
            description: 'URL of the cover image',
            maxLength: 250,
          },
          course_description: {
            type: 'string',
            description: 'Description of the course',
          },
          course_time: {
            type: 'object',
            required: ['start', 'end'],
            properties: {
              start: {
                type: 'string',
                description: 'Start time of the course in HH:MM (24-hour format)',
                pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$',
              },
              end: {
                type: 'string',
                description: 'End time of the course in HH:MM (24-hour format)',
                pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$',
              },
            },
          },
          user_id: {
            type: 'string',
            description: 'ID of the user who created the course',
          },
          is_archived: {
            type: 'boolean',
            description: 'Whether the course is archived',
            default: false,
          },
          course_status: {
            type: 'string',
            description: 'Status of the course',
            enum: ['Ongoing', 'Upcoming', 'Completed', 'Archived'],
            default: 'Ongoing',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp of when the course was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp of the last update to the course',
          },
        },
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./controllers/courses/courseRoutes.js'], 
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export default function swaggerDocs(app, PORT) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  console.log(`Swagger docs available at http://localhost:${process.env.PORT || 8000}/api-docs`);
}
