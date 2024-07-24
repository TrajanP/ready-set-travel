# Ready Set Travel - Find it [Here](https://ready-set-travel-app.com).
![Alt text](frontend/src/media/maps/Berlin.png?raw=true "Title")
- - - 
### Ready Set Travel is a simple and intuitive way to make your next Adventure easier and more enjoyable. Focusing on a visual way to represent your Trip with a Stop by Stop itinerary represented on a dynamic world map.
### With the goal to avoid spending even more time with Itinerary planning, the visual experience is simple and light weight. A few clicks, and you are already on your way to planning your trip.  
### Our visual planner allows you to spend more time sipping Pena Coladas or finding new adventures rather than being overwhelmed with planning. So start clicking, that beach hammock is closer than you think!
  
## Note - Project is in production. Local version is built, but now working on transitioning project to the cloud.
## Note - Currently the website is not built to be responsive with mobile viewing.
# The Stack
- - -
### Postgres
> PostgreSQL is an object-relational database management system used to store user data.

### Express -v 4.18.2
>  Express is a powerful and flexible server framework for building web applications with Node.js. 

### React -v 18.2.0
> React is a Front End library which allows the developer to code and reuse components to build our UI. It efficiently renders using the Virtual DOM and compares state changes with the DOM. The library provides developer benefits such as State Management, Component Lifecycle Methods and React Hooks. 

### Node JS -v 16.13.2
> Node JS is a runtime environment that allows developers to run JavaScript code on the server side, outside of a web browser. Furthermore node allows the use of NPM and the Express framework with our project.

### Mapbox GL JS -v 2.11.1
> Mapbox is a client-side JavaScript library for building web maps and web applications with Mapbox's modern mapping technology.
> This library allows users to view and interact with a dynamic map display of their created trip. 

### Google Places API
> Google Places is a service which accepts HTTPS requests for location data. RST uses this service to provide autocomplete capabilities for user location input.
### Framer Motion -v 11.2.11
> A powerful animation and motion library for React. 
> This library provides the framework for the Front End Parallax effect found on the app homepage. 

### React Router Dom -v 6.4.5
> A routing library allowing dynamic site navigation for a React app.

# Starting the Project Locally
- - -
### Ensure you have Node (Java Runtime Environment) installed in your developer environment.   
> Find it [Here](https://nodejs.org/en/download/package-manager).
### To Pull the Repo to Local
> `git clone https://github.com/TrajanP/ready-set-travel.git`
### To Install Dependencies
- In server Directory, Run
> `npm install`
- In frontend Directory, Run
> `npm install`
### Ready to Launch
- The backend runs on port 5000
- In server Directory, Run
> `nodemon index`
- The frontend runs on port 3000
- In frontend directory, Run
> `npm start`
- Both the frontend and backend should be running and communicating now.
