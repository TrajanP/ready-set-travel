-- Will work on when Database has been fully established. 

-- CREATE DATABASE traveldb;

-- CREATE TABLE trips(
--     trip_id SERIAL PRIMARY KEY,
--     trip_name VARCHAR(255),
--     trip_origin VARCHAR(255),
--     trip_return VARCHAR(255),
--     trip_description VARCHAR(255),
--     trip_type VARCHAR(255),
--     trip_start_date VARCHAR(255),
--     trip_end_date VARCHAR(255)
-- );

CREATE TABLE "users" (
  "user_id" SERIAL,
  "user_username" VARCHAR(255) UNIQUE NOT NULL,
  "user_first_name" VARCHAR(255) NOT NULL,
  "user_last_name" VARCHAR(255) NOT NULL,
  "user_password" VARCHAR(255) NOT NULL,
  "user_refresh_token" VARCHAR(255),
  PRIMARY KEY ("user_id")
);

CREATE TABLE "trips" (
  "trip_id" SERIAL,
  "user_id" VARCHAR(255) NOT NULL,
  "trip_name" VARCHAR(255) NOT NULL,
  "trip_origin" VARCHAR(255) NOT NULL,
  "trip_description" VARCHAR(255),
  "trip_start_date" DATE NOT NULL,
  "trip_type" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("trip_id"),
  CONSTRAINT "FK_trips.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("user_id")
);

CREATE TABLE "stops" (
  "stop_id" SERIAL,
  "trip_id" INT NOT NULL,
  "stop_name" VARCHAR(255) NOT NULL,
  "stop_location" VARCHAR(255) NOT NULL,
  "stop_order" INT NOT NULL,
  "stop_first_day" DATE NOT NULL,
  "stop_last_day" DATE NOT NULL,
  PRIMARY KEY ("stop_id"),
  CONSTRAINT "FK_stops.trip_id"
    FOREIGN KEY ("trip_id")
      REFERENCES "trips"("trip_id")
);

CREATE TABLE "accommodations" (
  "accommodation_id" SERIAL,
  "accommodation_name" VARCHAR(255) NOT NULL,
  "accommodation_type" VARCHAR(255) NOT NULL,
  "accommodation_address" VARCHAR(255),
  "accommodation_link" VARCHAR(255),
  PRIMARY KEY ("accommodation_id")
);

CREATE TABLE "trip_routes" (
  "trip_route_id" SERIAL,
  "trip_route_id" INT,
  "trip_route_json" JSON,
  PRIMARY KEY ("trip_route_id")
);

CREATE TABLE "days" (
  "day_id" SERIAL,
  "stop_id" INT NOT NULL,
  "day_order" SERIAL,
  "accommodation_id" INT,
  "day_person_count" INT NOT NULL,
  "day_activity_count" INT NOT NULL,
  "day_name" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("day_id"),
  CONSTRAINT "FK_days.stop_id"
    FOREIGN KEY ("stop_id")
      REFERENCES "stops"("stop_id"),
  CONSTRAINT "FK_days.accommodation_id"
    FOREIGN KEY ("accommodation_id")
      REFERENCES "accommodations"("accommodation_id")
);

CREATE TABLE "activities" (
  "activity_id" SERIAL,
  "day_id" INT NOT NULL,
  "activity_title" VARCHAR(255) NOT NULL,
  "activity_type" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("activity_id"),
  CONSTRAINT "FK_activities.day_id"
    FOREIGN KEY ("day_id")
      REFERENCES "days"("day_id")
);
