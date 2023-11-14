# goober
I invested approximately 6 hours in the development of this project. It was quite challenging and enjoyable.

## goober-api
1. Make sure you have Node.js version 21.0.0 or higher installed. If you don't, install the nvm package manager and then install Node.js version 21.0.0.

2. You could use the following command on the `goober-api` folder to set the node version if you using nvm.
    ```bash
    nvm use
    ```
3. Instead of `npm`, this project uses `pnpm` as the package manager. If you do not have `pnpm`, install it using the following command:
    ```bash
    npm install --global pnpm
    ```
4. Install the project dependencies.
    ```bash
    pnpm install
    ```
5. Rename the file `.env.example` to `.env`
6. Set the Docker container up.
    ```bash
    docker-compose up -d
    ```
7. Execute prisma migrations
    ```bash
    pnpm prisma migrate dev
    ```
8. Start the project
    ```bash
    pnpm run start:dev
    ```

## goober-web
1. Make sure you have Node.js version 21.0.0 or higher installed. If you don't, install the nvm package manager and then install Node.js version 21.0.0.

2. You could use the following command on the `goober-api` folder to set the node version if you using nvm.
    ```bash
    nvm use
    ```
3. Instead of `npm`, this project uses `pnpm` as the package manager. If you do not have `pnpm`, install it using the following command:
    ```bash
    npm install --global pnpm
    ```
4. Install the project dependencies.
    ```bash
    pnpm install
    ```
5. Rename the file `.env.example` to `.env.local`
6. Start the project
    ```bash
    pnpm run dev
    ```
7. Open the `local` url show in your terminal on the browser.
    ```base
    ▲ Next.js 14.0.2
    - Local:        http://localhost:3000 <-------
    - Environments: .env.local
    ```

### How it works

#### Passenger
`http://localhost:3000/`
A login screen was developed for the passenger to provide their name and proceed. This information is stored in the database as a user of type `PASSENGER`.

`http://localhost:3000/rider`
Upon entering, the passenger will be presented with a screen where they can input their pickup and drop-off locations and confirm.

`http://localhost:3000/rider/confirm?pickup=XX,XX&dropoff=XX,XX`
The passenger will be shown a screen with a map displaying their pickup and drop-off locations, as well as the available car for the trip, estimated travel time, and fare. If everything is satisfactory, they can click on `Confirm Goober` or go back to the previous screen to input a new destination. Upon confirmation, a trip record is created in the database.

`http://localhost:3000/rider/trip`
This screen allows the passenger to wait until a driver accepts the trip. A map displaying the passenger's current location is shown on this screen. The passenger has the option to cancel the trip if necessary.
Note: A `Find a driver` button has been added at the top of the page, which I will explain further ahead.

#### Driver
As there is no login or registration process, to access the application as a driver, you should use the link below.

`http://localhost:3000/driver`
On this screen, the driver waits until a trip is suggested to them. They have the option to exit the application if desired.
Note: On this screen, there is a button called `Find trip`. By clicking on it, the system will check if there is any available trip. If there is, the driver will be shown information such as the travel time to the passenger, the fare for the trip, and a map with their current location and the location of the passenger they should pick up. The driver has the option to accept or decline the trip.

#### Passenger
After a driver accepts the trip, the passenger should click on the `Find a driver` button.
Doing so will display the driver's location along with information about the driver and the estimated time until they reach the passenger's location.

#### Management
We have the option to access the administrative area through the link below. Similar to the driver's case, as no registration and authentication process has been developed, it is necessary to access through the link below.

`http://localhost:3000/management`
This screen displays a map identifying the points where there are drivers and passengers.

`http://localhost:3000/management/riders`
On this screen, the completed trips are listed.

### Next steps
(There is information available in the code that should be in environment variables. I left it in the code to facilitate testing, as in the case of the Mapbox API access token. This will not be a problem as I will delete this account in a few days).

Some basic functionalities have been developed to demonstrate how some core features of the application would work. However, there are many points that need improvement before launching this application to consumers.
The following are the areas that need improvement/development:
- Remove information from the code and migrate it to environment variables.
- Implement a registration and authentication process for the security of all users of the service.
- Enable the registration of drivers.
- Enable the registration of system administrators.
- Implement real-time updates of information without the need for the Find buttons. A solution using WebSocket is likely ideal.
- Implement a pub/sub service to ensure that more than one driver receives the same trip request.
- Ensure that a driver cannot accept more than one trip at a time.
- Ensure that a passenger cannot request more than one trip at a time.
- Allow both passengers and drivers to cancel a trip at any time.
- Implement variable trip fares based on external factors (weather, time, traffic, etc.).
- Utilize real-time location tracking for both passengers and drivers.
- Update the management map with the positions of passengers and drivers.
- Create a dashboard with revenue information for the last 30, 60, and 90 days.
- Allow administrators to cancel a trip.

### Technologies
For this application, I used the following technologies:
- NextJS
- NestJS
- Docker
- Postgres

Relevant Libraries - Backend:
- Prisma
- Vitest
- Zod

Relevant Libraries - Frontend:
- React Hook Form
- Lucide React
- React Data Table Component
- Mapbox GL

By [Yuri Palacio](https://www.linkedin.com/in/yuri-palacio/) :wave:
