export default function Home() {
  return (
    <main>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <h1>Trail Collector</h1>
        <a href="/api/auth/start" style={{ color: 'inherit', backgroundColor: 'var(--action)', padding: 6, borderRadius: 4 }}>Connect to Strava</a>
      </header>

      <h2>What is this?</h2>
      <p><strong>I&rsquo;m collecting hikes.</strong> Many of us want to get out into the mountains, but we&rsquo;re not always sure how to get there and then get back. Some of the best inspiration comes from the places others have gone before, and that&rsquo;s where you come in.</p>

      <p>When you share your Strava activities, this tool works with you to pare them down to a list that others can get inspiration from, removing any identifying data in the process.</p>

      <h2>How does it work?</h2>
      Here it is in 3 fairly easy steps:
      <ol>
        <li><a href="/api/auth/start">Authorize Strava</a> to fetch your activities. We only care about the ones in New England that touch a mountain peak, all others are ignored.</li>
        <li>For each activity, you can choose whether to share it; you can also give it a name and a link. If the hike was connected to a MITOC trip, that link would be especially helpful.</li>
        <li>Download the resulting list of selected activities (if you&rsquo;re curious, you can use <a href="https://geojson.io/" rel="noopener">geojson.io</a> to visualize what&rsquo;s in it) and share it with me.</li>
      </ol>

      <p>No activities are stored or sent anywhere unless you choose to download and share them, and the source code for this is <a href="https://github.com/carpeliam/strava2geojson">open source</a>.</p>

      <h2>Is this a MITOC thing?</h2>
      <p>Hopefully, at some point! This is a personal project at the moment, but if it&rsquo;s helpful to the club, then it could become a MITOC thing.</p>

      <h2>What do you do with routes after I send them to you?</h2>
      <p>I incorporate them into the <a href="https://carpeliam.com/mitoc-trail-viewer/" target="_blank">MITOC Trail Viewer</a>.</p>
    </main>
  );
}
