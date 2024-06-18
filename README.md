# adp-assessment :evergreen_tree:

## :hammer_and_wrench: Running

```
npm install
npm run start
```

Logs:

```
Math operations in background. Process started
adp accessment: Math Operations Service up and running at 3000
```

## :rocket: Features:
- :diamond_shape_with_a_dot_inside: Execute math operations in background every :one::zero: seconds using the Interview ADP API
- View that loads the list of executed math operations and show its status
- Operations can be loaded by and rest endpoint API `GET /operations` :point_left:

## TODO 
- Extract baseURL to an environment variable and install dotenv 
- Install a library to handle with dependency injection instead of creating manual instances in the `app.ts` file 
- Improve logs, adding a Winston library to handle logs in different environments :point_left:
- Add a controller layer to handle the express API calls (`app.ts` file is a little bit messy)
- Implements a repository that persists in a real-world database, such as SqlLite (just memory usage)
- Add a better solution for cron, such as library `agenda`, instead of using the simple `setInterval`
- Extract front-end to an external application using React/Angular/Vue

## :bug: Bugs
- If happens a protocol HTTP error to call ADP API (such as network issues) it crashes the application and the setInterval stops, requiring an application cold restart :disappointed_relieved: :collision: