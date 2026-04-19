# Contributing to Strava2GeoJSON Trail Collector

Thanks for your interest in contributing! There are two ways to contribute:

- **Contributing hikes** — follow the steps in the [README](README.md) to authorize Strava, select your activities, and share the resulting file.
- **Contributing code** — read on.

## Getting Started

You'll need your own Strava API application to run this project locally. To set one up:

1. Follow [Strava's getting started guide](https://developers.strava.com/docs/getting-started/) to create an API application.
2. Set the following environment variables with the details specific to your application:
    - `STRAVA_CLIENT_ID`
    - `STRAVA_CLIENT_SECRET`
    - `STRAVA_ACCESS_TOKEN`

## Legal

This project is licensed under [GPL-3.0-only](LICENSE.md).

As this application is an integration with the Strava API, this project and any derivatives remain subject to [Strava's API Agreement](https://www.strava.com/legal/api). Notably:

- Activity data may only be displayed to the user who owns it
- Data obtained via the Strava API may not be used to train AI models

By contributing, you agree that your contributions will be licensed under the same GPL-3.0-only license.
