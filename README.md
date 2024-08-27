# TattooHub RESTful API

This is a RESTful API project built with the NestJS framework for managing a tattoo appointment system.

## Project Description

TattooHub is a backend API for a tattoo appointment management system. It allows users to register, login, and manage tattoo appointments. The project uses the NestJS framework in conjunction with PostgreSQL database and Prisma ORM.

## Key Features

- User authentication (signup, login)
- JWT authentication
- User information management
- Appointment management (create, view, update, delete appointments)

## Tech Stack

- NestJS
- PostgreSQL
- Prisma ORM
- Docker (for development database)
- Jest (for testing)

## Getting Started

### Prerequisites

- Node.js (v14+)
- yarn
- Docker and Docker Compose

### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/tatoohub-restful.git
cd tatoohub-restful
```

2. Install dependencies:

```
yarn install
```

3. Set up environment variables:

Create a `.env` file and add necessary environment variables. Refer to `.env.example` file if it exists.

4. Start the development database:

```
yarn db:dev:up
```

5. Run database migrations:

```
yarn prisma:dev:deploy
```

### Running the Application

Development mode:

```
yarn start:dev
```

Production mode:

```
yarn build
yarn start:prod
```

## Testing

Run unit tests:

```
yarn test
```

Run e2e tests:

```
yarn test:e2e
```

## API Documentation

(Here you can add a link to API documentation or briefly explain how to access the API docs)

## Contributing

Contributions are welcome! Please read `CONTRIBUTING.md` for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

(Here you can add contact information for project maintainers or project-related contact info)

This README file provides basic information about the project, installation and usage instructions, an overview of main features, and other relevant information. You can adjust and supplement it according to your actual needs. If you need more details or have any other questions, please feel free to ask.