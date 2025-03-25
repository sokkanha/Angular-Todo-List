# TodoListApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.
## Preview 
![Screenshot 2025-03-24 160906](https://github.com/user-attachments/assets/557f43a3-a9ff-4195-939c-f333108a1d2f)
![Screenshot 2025-03-24 160919](https://github.com/user-attachments/assets/3614852a-ec12-4d0a-a4fa-6bbd80c4b2c6)

## Development server
Before starting the Angular development server, you need to run the JSON server to provide fake data. Execute the following command:

```bash
npx json-server -w db.json --port 8080
```
To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
