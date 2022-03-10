const response = [
  {
    id: 1293487,
    name: "KCRW",  // radio station callsign
    tracks: [{ timestp: "2021-04-08", trackName: "Peaches" }]
  },
  {
    id: 12923,
    name: "KQED",
    tracks: [
      { timestp: "2021-04-09", trackName: "Savage" },
      { timestp: "2021-04-09", trackName: "Savage (feat. Beyonce)" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" }
    ]
  },
  {
    id: 4,
    name: "WNYC",
    tracks: [
      { timestp: "2021-04-09", trackName: "Captain Hook" },
      { timestp: "2021-04-08", trackName: "Captain Hook" },
      { timestp: "2021-04-07", trackName: "Captain Hook" }
    ]
  }
];

const modifyTooltip = (tooltip, trackName) => {
  const trackTitles = tooltip.split(',');
  const trackIndex = trackTitles.findIndex(trackTitle => trackTitle.includes(trackName));

  const REG_EX_TO_FIND_COUNT = /\((.*)\)/;

  const currentTotal = trackTitles[trackIndex].match(REG_EX_TO_FIND_COUNT)[1];
  const newTotal = Number(currentTotal) + 1
  trackTitles[trackIndex] = trackTitles[trackIndex].replace(currentTotal, newTotal);

  return trackTitles.join(',');
}

const transformResponse = (response) => {
  const result = [];
  response.forEach((responseInfo) => {
    responseInfo.tracks.forEach(trackInfo => {
      const existingResultIndex = result.findIndex(res => res.x === trackInfo.timestp);
      if (existingResultIndex === -1) {
        result.push({
          x: trackInfo.timestp,
          y: 1,
          tooltip: `${trackInfo.trackName} (1)`
        });
        return;
      };
      // increase total count
      result[existingResultIndex].y++;

      // Create a tooltip if this track is the first at this day
      if (!result[existingResultIndex].tooltip.includes(trackInfo.trackName)) {
        result[existingResultIndex].tooltip += `, ${trackInfo.trackName} (1)`;
        return;
      };
      // Modify toolitip for existing tracks
      result[existingResultIndex].tooltip = modifyTooltip(result[existingResultIndex].tooltip, trackInfo.trackName);
    });
  });
  return result;
};

console.log(transformResponse(response))
