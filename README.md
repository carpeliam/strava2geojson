# Strava2GeoJSON Trail Collector

## What is this?

**I'm collecting hikes.** Many of us want to get out into the mountains, but we're not always sure how to get there and then get back. Some of the best inspiration comes from the places others have gone before, and that's where you come in.

When you share your Strava activities, this tool works with you to pare them down to a list that others can get inspiration from, removing any identifying data in the process.

## How does it work?

Here it is in 3 fairly easy steps:

1.  Authorize Strava to fetch your activities. We only care about the ones in New England that touch a mountain peak, all others are ignored.
2.  For each activity, you can choose whether to share it; you can also give it a name and a link. If the hike was connected to a MITOC trip, that link would be especially helpful.
3.  Download the resulting list of selected activities (if you're curious, you can use [geojson.io](https://geojson.io/) to visualize what's in it) and share it with me.

No activities are stored or sent anywhere unless you choose to download and share them, and the source code for this is open source.

## Is this a MITOC thing?

Hopefully, at some point! This is a personal project at the moment, but if it's helpful to the club, then it could become a MITOC thing.

## What do you do with routes after I send them to you?

I incorporate them into the [MITOC Trail Viewer](https://github.com/carpeliam/mitoc-trail-viewer).
