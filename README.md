<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Florida2DAM/WatchTracker">
    <img src="https://avatars.githubusercontent.com/t/4374826?s=280&v=4" alt="Logo" width="300" height="300">
  </a>

  <h1 align="center">Watch Tracker</h1>



<!-- ABOUT THE PROJECT -->
## About the Project

Watch Tracker is a mobile application that will help you searching a huge amount of movies provided by The Movie Database (TMDB) API and also see the streaming platforms where they are available at thanks to JustWatch partnership with TMDB.

With Watch Tracker you will be able to manage your own movie list, selecting between the different options:
* Watch State (Plan to Watch, Watching, Watched).
* Watch Date (The date when you saw or are planning to see the movie).
* Score (Your personal score about the movie).

Watch Tracker also provides a "Subscription Tracking" for the most important stream providers, like Netflix, Prime Video, Disney Plus, etc.

Search the latest movies, the upcoming ones or search by yourself introducing its name.

The application also provides a web based backoffice to administrate some user options, managing the providers in the database and to see some reports abouts the application use. You can access the backoffice from anywhere.

<!-- CONTACT -->
## Developer Team

|      Members      |             Contanct               |  Avatar  |
|-------------------|------------------------------------|----------|
|  José Lacueva     |  jolame@floridauniversitaria.es    |<img src="https://avatars.githubusercontent.com/u/58451072?s=460&u=b8f56b5ba0ee46e829edd76086e733016731b6fd&v=4" alt="drawing" width="50" height="50"/>|
|  Carla Aparicio   |  caapal@floridauniversitaria.es     |<img src="https://avatars.githubusercontent.com/u/56550138?s=460&u=46095a4312d0bea92a933108b4a42b402a38b4c9&v=4" alt="drawing" width="50" height="50"/>|
|  Álvaro Alepuz    |  alalma02@floridauniversitaria.es  |<img src="https://avatars.githubusercontent.com/u/57366260?s=460&v=4" alt="drawing" width="50" height="50"/>|
|  Noelia Conches   |  nocopo@floridauniversitaria.es    |<img src="https://avatars.githubusercontent.com/u/57366330?s=460&v=4" alt="drawing" width="50" height="50"/>|
|  Alejandro Moret  |  almogo01@floridauniversitaria.es  |<img src="https://avatars.githubusercontent.com/u/57366094?s=460&v=4" alt="drawing" width="50" height="50"/>|


## Developed with

### The application has been developed with:

|        Key        |     Technology     |   Link   |
|-------------------|--------------------|----------|
|    Mobile App     |  React Native      |<a href="https://reactnative.dev/"><img src="https://reactnative.dev/img/header_logo.svg" width="50" height="50"/></a>|
|    Backoffice     |  React             |<a href="https://es.reactjs.org/"><img src="https://reactnative.dev/img/header_logo.svg" width="50" height="50"/></a>|
|    Web API        |  ASP.NET Framework |<a href="https://dotnet.microsoft.com/apps/aspnet"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/.NET_Logo.svg/1200px-.NET_Logo.svg.png" width="50" height="50"/></a>|
|    Database       |  Entity Framework  |<a href="https://docs.microsoft.com/es-es/ef/"><img src="https://3.bp.blogspot.com/-Ox1RXIqyaE8/VtURKh85shI/AAAAAAAABIw/2F_vzs-EVSY71FiJ60fpv9WuZwM3cD5xACKgB/s1600/entity_image.png" width="50" height="50"/></a>|
|    Database       |  MySQL             |<a href="https://www.mysql.com/"><img src="http://pngimg.com/uploads/mysql/mysql_PNG9.png" width="50" height="50"/></a>|
|    Hosting        |  AWS               |<a href="https://aws.amazon.com/es/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLnRCwyP1EcsVzWzu7Z1PlWqjti1elkdDomg&usqp=CAU" width="50" height="50"/></a>|
|    HCM            |  FlexyGo           |<a href="https://www.flexygo.com/"><img src="https://pbs.twimg.com/profile_images/1088758127409926145/v3njj5Eu_400x400.jpg" width="50" height="50"/></a>|



<!-- GETTING STARTED -->
## Getting Started

### Solve some possible issues

In the React Native application, if you try to install the dependencies and run the application in the AVD it may cause an error for something wrong with the React-Native-Number-Picker-Dialog library, just go to the path indicated and comment the line 33 where is written "@Override".
   ```sh
   Go to path: FrontendWT\node_modules\react-native-numberpicker-dialog\android\src\main\java\fr\bamlab\reactnativenumberpickerdialog\RNNumberPickerDialogPackage.java
   Before: Line 33: @Override
   After: Line 33: //@Override
   ```

To run the backend you will have to run Visual Studio as administrador and recompile the solution. If there are any error about the Assets, you will have to copy the Assets folder inside BackendWT and paste it in the path that indicates the error.

## Documentation

### Web API Documentation
 * [Web API](https://github.com/Florida2DAM/WatchTracker/blob/master/Documentation%20-%20PI/Watch%20Tracker%20-%20Web%20API%20-%20Documentation.pdf)

### PI Documentation
 * [Project](https://github.com/Florida2DAM/WatchTracker/blob/master/Documentation%20-%20PI/documentacion-proyecto2021.pdf)



<!-- LICENSE -->
## License

The app is distributed under Creative Commons Non Commercial license. To see more information: [Creative Commons License](https://es.wikipedia.org/wiki/Licencias_Creative_Commons)

## Application Download
 ![APK QR](https://github.com/Florida2DAM/WatchTracker/blob/master/PI%20-%20Assets/qr_wt_apk.png)
 * [APK URL](https://mega.nz/file/F3wxAKaT#zcOgxal7lXvYWNCF_3vMfgubtvgLFjZcYue0mePPUu0)

## Backend/Backoffice Demo
* [Backoffice](http://23.22.212.18:12641/)
* [Backend](http://23.22.212.18:12640/)

## Mentions

* Movie Database: [The Movie Database (TMDB)](https://www.themoviedb.org/?language=es-ES)
* Stream Providers Database: [JustWatch](https://www.justwatch.com/)
