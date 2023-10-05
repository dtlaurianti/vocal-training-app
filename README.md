# Vocal Training App

This app currently focuses on providing piano-backed vocal exercises to the user. The intent is that a singer can follow along to these exercises, choosing some syllables to sing on, and matching the pitches played by the piano. This is how the technical aspect of vocal practice usually goes, whether the piano is provided by the singer, a teacher, or a video.

The front end of the app is built in the React Javascript framework. It uses React functional components to accept user control to designate and configure exercises, request exercise and audio sample data from the backend, and present the audio data to the Web Audio API for fluid playback. The back end of the app is built in the FastAPI Python framework. It provides an API for the client app to access audio samples and an exercise library. Exercises are stored in a MySQL relational database which maps samples-notes, scale degrees-scales, scale degrees-chords, and chords/scales-exercises. These exercises then identify which samples are needed to be sent to the client for a given exercise.

## How to startup servers and use app from the package directory

#### Database

```powershell
$ cd database
$ docker network create vocal
$ docker build . -t database
$ docker run --name database --rm -dit --network vocal -p 3306:3306 database
$ cd ..\..
$ vocalapp\database\denv\Scripts\activate
$ python -m vocalapp.database.setup
```

#### Backend

```powershell
$ cd backend
$ benv\Scripts\activate
$ uvicorn main:app --reload
```

### Frontend

```powershell
$ cd frontend
$ npm run dev
```
