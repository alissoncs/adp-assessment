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
- Operations can be loaded at `GET /operations` :point_left:

## TODO 
- Extract baseURL into an environment variable and install dotenv 
- Install a library to handle dependency injection instead of creating manual instances in the `app.ts` file 
- Improve logs by adding a Winston library to handle logs in different environments :point_left:
- Add a controller layer to handle Express API calls (`app.ts` file is a little bit messy)
- Implement a repository that persisit data in a real-world database, such as MongoDB using mongoose (typegoose)
- Add a better solution for cron, such as library `agenda`, instead of using the simple `setInterval`
- Move each `dto` to its own specific file
- Extract front-end to an external application using React/Angular/Vue

## :bug: Bugs
- Whether a protocol HTTP error occurs to call ADP API (such as network issues) it crashes the application and the `setInterval` function stops, requiring an application cold restart :disappointed_relieved: :collision: