# adp-assessment :evergreen_tree:

## :rocket: Features:
- :diamond_shape_with_a_dot_inside: Execute math operations in background every :one::zero: seconds using the Interview ADP API
- View that loads the list of executed math operations and show its status
- Operations can be loaded by and rest endpoint API `GET /operations` :point_left:

## TODO
- Improve logs, adding a Winston library to handle logs in different environments :point_left:
- Add a controller layer to handle the express API calls (`app.ts` file is a little bit messy)
- Implements a repository that persists in a real-world database, such as SqlLite (just memory usage)
- Add a better solution for cron, such as library `agenda`, instead of using the simple `setInterval`

## :bug: Bugs
- If happens an protocol HTTP error, its not catched the application crashes and the setInterval stops, requiring an application cold restart :disappointed_relieved: :collision: