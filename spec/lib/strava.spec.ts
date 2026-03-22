import { describe, it, expect } from 'vitest';
import { toGeoJSON, isInNewEngland, simplifyLine, truncatePoints, isNearPeak } from '@/lib/strava';
import type { SummaryActivity } from 'strava-v3';
import { featureCollection, lineString, point } from '@turf/helpers';

describe('strava', () => {
  it('should filter out strava activities that are outside New England', () => {
    expect(stravaActivities.filter(isInNewEngland)).toHaveLength(2);
  });

  it('should convert strava activities to geojson', () => {
    const geojson = toGeoJSON(stravaActivities.filter(a => !!a.map?.summary_polyline));
    expect(geojson.features.map(f => f.properties)).toEqual([
      {
        name: 'Up Mt Washington',
        total_elevation_gain: 1883.7,
        date: '2023-07-30',
      },
      {
        name: 'Blue Hills',
        total_elevation_gain: 461,
        date: '2025-04-05',
      },
      {
        name: 'Mount Whitney',
        total_elevation_gain: 1347,
        date: '2025-07-30',
      },
    ]);
  });

  it('should limit coordinates to 6 decimal places', () => {
    const geojson = lineString([
      [ -73.987654321, 41.123456789 ],
      [ -73.123456789, 41.987654321 ],
    ]);
    const simplifiedGeojson = truncatePoints(geojson);
    expect(simplifiedGeojson.geometry.coordinates).toEqual([
      [ -73.987654, 41.123457 ],
      [ -73.123457, 41.987654 ],
    ]);
  });

  it('should remove points that do not meaningfully contribute to the path', () => {
    const geojson = lineString([
      [0, 0],
      [0.00001, 0.5],
      [0, 1],
    ]);

    const simplifiedGeojson = simplifyLine(geojson);

    expect(simplifiedGeojson.geometry.coordinates).toHaveLength(2);
  });

  it('should detect whether a route goes over a peak', () => {
    const routeNearSummit = lineString([
      [-71.3033, 44.2650],
      [-71.3033, 44.2706],
      [-71.3033, 44.2760],
    ]);
    expect(isNearPeak(routeNearSummit, peaks)).toBe(true);

    const routeFarAway = lineString([
      [-71.3033, 44.0000],
      [-71.3033, 44.0100],
    ]);
    expect(isNearPeak(routeFarAway, peaks)).toBe(false);
  });


  const stravaActivities = [
    {
      name: 'Up Mt Washington',
      distance: 19262.2,
      total_elevation_gain: 1883.7,
      type: 'Hike',
      sport_type: 'Hike',
      start_date: '2023-07-30T11:33:19Z',
      start_date_local: '2023-07-30T07:33:19Z',
      timezone: '(GMT-05:00) America/New_York',
      map: {
        summary_polyline: 'e`cmG|s{qLgB@iCnA_FrE{@~AaBXi@|@JjAz@pAq@zBZUz@\\fCdB?^aC`@iAl@q@dB?f@rALhA^j@tAa@h@oBDaBhA_@r@m@lFm@|BHfDX`BAvATfAQzNc@vH_@hB@zCu@xF_A`Do@dGk@zBcArA_@rGi@\\e@dAa@~BUrBRjARh@xAQf@Nt@xAhApDnBt@jAlALhCZZPx@k@n@IX@CWxAsA`Co@vBTZbBb@n@t@`@lB|@r@@QmApB}@`@k@BeBu@yB`@QK_@X`@f@SGEp@HB[GXjBgA_BaAC_Aw@g@ESXDbBZj@HlBKr@j@dBjAjHy@hFE~BR^W|@Rj@qCzFErEg@rCBxCQjBUb@W~H\\tHGl@k@TIvDSFU`Bc@RU~APBCNe@^@zAo@ZmA[mCRcAq@[Hs@u@k@AiBl@oCC{@hCObBgBTFL`@?Iq@c@m@[LZTc@GAb@cAx@Ps@JJJUk@ITQNZGk@[`@d@{AZt@^Ir@r@i@o@c@BWp@?[QRZk@_@NNLr@s@KH\\Ff@p@x@HtAqFp@Kp@ZzB_A~A\\fBdAfB@|AObAZpB{@bBNvBz@xCOTR@t@rAWp@l@nDl@jEUdBs@pAErMqC~@kHfCwBGeC`@cAl@UzB_CnA_BNw@?kCl@cBhDsDrD{Az@aC?c@ZAPHcAZW~BxJRFW`@QzDtAzBlBv@HhErBdBa@pBhA~@[nQzB`B[b@PrB`BvCdHl@`CBdA~@jAbAdCzAj@RfBdB`Bx@tCZ\\tBr@`C[vBnAzESlBVr@[jAj@NT`El@~AEdDxAfBm@vAFx@l@pC|EfEnDpDdFvF]|BPd@S|@cBjCYl@XGLGIPOv@FbC`Bz@lAx@Hd@cAn@[lATdBhBdAq@`HqBrAb@pAzB~AZ~ArAtCDbAlAbCzAhBQ|Bb@tCuArAoAVj@^jBf@Yi@`@_@qAQcAe@h@{B|@k@p@iEGgAK}DuCoCOkAm@Yi@kAQeCwCy@SuElAwBrAqASu@kAe@WaADe@|@y@DoD{C{Bg@iCZwAxBcBQyG\\oK}Kq@sAo@i@sAeCkAWsBz@qDuAgGe@gCgAk@b@iA]uFTk@KmAqAeCd@cBa@kAgB?eAwBwBIuAyBaBYa@Go@m@_Ak@a@q@oEuCyGeCmBkBVaFw@',
      },
      private: false,
      start_latlng: [
        44.25747150555253,
        -71.25326570123434,
      ],
      end_latlng: [
        44.245034605264664,
        -71.29660424776375,
      ],
    },
    {
      name: 'Morning Hike',
      distance: 438.1,
      total_elevation_gain: 0,
      type: 'Hike',
      sport_type: 'Hike',
      start_date: '2023-07-09T12:33:49Z',
      start_date_local: '2023-07-09T08:33:49Z',
      timezone: '(GMT-04:00) America/Anguilla',
      utc_offset: -14400,
      map: { summary_polyline: '' },
      private: false,
      visibility: 'everyone',
      start_latlng: [],
      end_latlng: [],
    },
    {
      name: 'Blue Hills',
      distance: 7746.1,
      total_elevation_gain: 461,
      type: 'Hike',
      sport_type: 'Hike',
      start_date: '2025-04-05T17:39:13Z',
      start_date_local: '2025-04-05T13:39:13Z',
      timezone: '(GMT-05:00) America/New_York',
      map: {
        summary_polyline: 'qvt`GblaqLM|@FKNKl@MpAVz@Dt@`@TXXDd@]z@[jAeAVGTFLd@LNl@Dd@NNQFU@KTy@h@[\\TNCRLTVJ`@Zn@lATj@?jAb@bCAFHt@Jh@M`@C|@]xAKbBm@TUDY@GM_@Vw@AmBMWQSAIKCAYEGQQM]e@a@EWKMQs@B_@C@KeA[e@EYMEM_@Cc@FQ@k@I_@FVAf@CHYXg@Ps@Gy@o@WIQAu@iAu@s@m@U_Am@OOAMFmAQ_@]g@AWDw@HYLDAC@CCBG?Da@BMDKZMDUI[Bo@EEAKHUF_@GkAGU[SUe@CKCaA]}@]OKUBMMU?[KYGc@?Ye@eAGw@Du@AQAGOI@KKMF]C[DQKKUIQQISg@m@Qa@Qm@MCS_@@Ea@[C]BWAa@w@c@SUIQMKOc@_@MY[UcAM[s@aAI_AB[@eADSOqBIGIYMIy@aBMg@KSASEKOIMBIMCQMUECFSAYJi@`AKVFTW?IEICq@a@w@?YIe@FWl@QP?NMBGAKD]Ne@Ck@Y]GAAKUSCO][KWFU?SI_@D{@Sq@Ay@k@eCCI[AMM@e@DSd@Y^KVEf@@`@SJU`@RRb@XPTGPUv@[FKCKFCj@?PFJMNFDA@JJC~@kAn@IlAq@nAmBRsADMPWREHB~@jAxAvAR^VHNNNVMV?n@GFYAQBGJ^x@@PI\\@NCLLRAPDRCBBNLLLb@@ZIH?l@IRNh@Lz@Vx@AXQVAl@ARGHEp@?RLR?d@DP@nAIJId@@NHPLf@HxAG~@I\\B\\Cj@XdA?n@Fx@Hb@OrABrAEb@@j@CRRbBElAId@DpAFZE^Vv@LfAChAWpA?P`@B~@QJD_@r@W\\Q`@Q~@Qh@Ab@c@`CC|@Wd@Or@@NNf@TNBHEHH^Id@H^?nANT?LHXDX?ZBDAh@[lB@PTLlAb@dAjAb@\\N`@Ld@H|@Hf@?t@C\\H`A?^CRIJa@VS?eAUs@k@SKa@IQa@]e@s@k@]Oy@q@KWBy@Ce@o@y@i@Pe@^g@CsBs@UCa@L_@ZM\\YHMNOBMJq@Lk@`@GTCd@Sr@BRI`AMXu@`A[`AYZ[Ro@hAk@d@Uj@MLOX?XKr@BVCn@NLDTAXMZ?NHZIf@?^QTMl@KHA\\',
      },
      private: false,
      start_latlng: [
        42.218174,
        -71.118897,
      ],
      end_latlng: [
        42.21823,
        -71.119292,
      ],
    },
    {
      name: 'Mount Whitney',
      distance: 30376.2,
      total_elevation_gain: 1347,
      type: 'Hike',
      sport_type: 'Hike',
      start_date: '2025-07-30T12:47:00Z',
      start_date_local: '2025-07-30T05:47:00Z',
      timezone: '(GMT-08:00) America/Los_Angeles',
      map: {
        summary_polyline: 'umd~EzdjqUeBz@eA[q@iFsEAkCgFoAkLBoMV}FSsD{@qCSeJgCyAiBt@F_BgAkFxEiH~@Op@~@`@aAZeJ@aMeEcQ`@cDwBy@iCmIcD_CmAcEmG_HcBcFc@cGi@eAk@uQ@qGlA{Cr@`@t@m@h@}GnA{Bc@aH`@kFzFsDDiArA?v@eA`@Za@g@bDiGSyEjBuGxAMlBoBzAT|D}D`AgFrCeCv@EQkALgArAHSg@?c@v@cA}Ay@tMwC`GwCuINxLsGmHf@hIyGfAMmJp@vHwEe@_@oGfAnBwAaEl@xBmClEw@uH_CcEtClBiFcE`CeCJ{A{@eD|@mBgAcIzBuSoBmFqDaCMsEt@mEtDcE|FkBjGg@zHeBt@}EcFtAmChA}I_CeAwAiCc@yA|BjFvBjAkAvIoAjCpBvAzA`C~@?x@u@h@yHhBkGbEyF`GoExEa@xE|AhA`BbOx@|CbAhIeCjBrAzBkA~B~@nCQ`E_CwBdFtEoCnHlCb@_B`HkHIsJhAiKiA`BH}AwBvEBaBm@fBGkAw@jBJwDj@{Dd@y@}@`@Cz@Gy@Gz@Yi@?k@OtAGeCy@dCVsAs@uCgAhEFmGQf@J}@[Zl@mAYQf@QuAEr@oAmA`@n@oB{@p@`@gC]VTiA_@^t@{BaAx@h@sB{@bA\\cAWUw@d@f@}@_ABWq@\\UkCyAb@QHWw@g@V_CoAkB?eEeBcM`@e@yBiLaAyCgDqEi@}Do@T}@oIeDKb@qAkAq@}BcIPyAj@|Av@On@dDc@eP_A}ANa@e@g@r@iAeAi@kAuGeC_Dg@sBs@a@Qj@JeAi@kAKt@k@tBP`Bg@oB_C_A[^h@|AeAg@Xn@OJq@?sAcBeA?Ve@sEaC~@IgAYYmBjAXk@y@z@Ji@Sl@K_@YGU`@{@rE_FLyAoAsEsIuHSuAC_DbBqBcAZ}@KaA}BlAv@u@}@dA`@dA}BoCKQ]p@b@q@_@sAmF}D{AoArBDbByDb@_GG_AmCoCjDgIMdC_AfAsBuGpAiCw@bBMnCyBAm@oC\\XaAeBr@qDk@pBe@oAg@t@QV{AxB{BmDQqAdA_BaA_@g@v@?}Ak@wDuHeEyCxAEwA]aAgAzASsBUdAy@{C`@h@oAeErBYvAaA[gD{Hi@_EgFI?kDnAmDKyAmBqHiBs@fCPnFhJxCWZ{@d@t@P]',
      },
      private: false,
      start_latlng: [
        36.564275,
        -118.349738,
      ],
      end_latlng: [
        36.586951,
        -118.240185,
      ],
    },
  ] as SummaryActivity[];

  const peaks = featureCollection([
    point([-71.3033, 44.2705], { name: 'Mt. Washington' }),
  ]);
});
