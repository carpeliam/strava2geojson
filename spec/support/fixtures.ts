import { SummaryActivity } from 'strava-v3';
import { Trip } from '@/lib/trips';

export const stravaActivities = [
  {
    id: 101,
    name: 'Up Mt Washington',
    distance: 19262.2,
    total_elevation_gain: 1883.7,
    type: 'Hike',
    sport_type: 'Hike',
    start_date: '2023-07-30T11:33:19Z',
    start_date_local: '2023-07-30T07:33:19Z',
    timezone: '(GMT-05:00) America/New_York',
    map: {
      summary_polyline:
        'e`cmG|s{qLgB@iCnA_FrE{@~AaBXi@|@JjAz@pAq@zBZUz@\\fCdB?^aC`@iAl@q@dB?f@rALhA^j@tAa@h@oBDaBhA_@r@m@lFm@|BHfDX`BAvATfAQzNc@vH_@hB@zCu@xF_A`Do@dGk@zBcArA_@rGi@\\e@dAa@~BUrBRjARh@xAQf@Nt@xAhApDnBt@jAlALhCZZPx@k@n@IX@CWxAsA`Co@vBTZbBb@n@t@`@lB|@r@@QmApB}@`@k@BeBu@yB`@QK_@X`@f@SGEp@HB[GXjBgA_BaAC_Aw@g@ESXDbBZj@HlBKr@j@dBjAjHy@hFE~BR^W|@Rj@qCzFErEg@rCBxCQjBUb@W~H\\tHGl@k@TIvDSFU`Bc@RU~APBCNe@^@zAo@ZmA[mCRcAq@[Hs@u@k@AiBl@oCC{@hCObBgBTFL`@?Iq@c@m@[LZTc@GAb@cAx@Ps@JJJUk@ITQNZGk@[`@d@{AZt@^Ir@r@i@o@c@BWp@?[QRZk@_@NNLr@s@KH\\Ff@p@x@HtAqFp@Kp@ZzB_A~A\\fBdAfB@|AObAZpB{@bBNvBz@xCOTR@t@rAWp@l@nDl@jEUdBs@pAErMqC~@kHfCwBGeC`@cAl@UzB_CnA_BNw@?kCl@cBhDsDrD{Az@aC?c@ZAPHcAZW~BxJRFW`@QzDtAzBlBv@HhErBdBa@pBhA~@[nQzB`B[b@PrB`BvCdHl@`CBdA~@jAbAdCzAj@RfBdB`Bx@tCZ\\tBr@`C[vBnAzESlBVr@[jAj@NT`El@~AEdDxAfBm@vAFx@l@pC|EfEnDpDdFvF]|BPd@S|@cBjCYl@XGLGIPOv@FbC`Bz@lAx@Hd@cAn@[lATdBhBdAq@`HqBrAb@pAzB~AZ~ArAtCDbAlAbCzAhBQ|Bb@tCuArAoAVj@^jBf@Yi@`@_@qAQcAe@h@{B|@k@p@iEGgAK}DuCoCOkAm@Yi@kAQeCwCy@SuElAwBrAqASu@kAe@WaADe@|@y@DoD{C{Bg@iCZwAxBcBQyG\\oK}Kq@sAo@i@sAeCkAWsBz@qDuAgGe@gCgAk@b@iA]uFTk@KmAqAeCd@cBa@kAgB?eAwBwBIuAyBaBYa@Go@m@_Ak@a@q@oEuCyGeCmBkBVaFw@',
    },
    private: false,
    start_latlng: [44.25747150555253, -71.25326570123434],
    end_latlng: [44.245034605264664, -71.29660424776375],
  },
  {
    id: 102,
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
    id: 103,
    name: 'Blue Hills',
    distance: 7746.1,
    total_elevation_gain: 461,
    type: 'Hike',
    sport_type: 'Hike',
    start_date: '2025-04-05T17:39:13Z',
    start_date_local: '2025-04-05T13:39:13Z',
    timezone: '(GMT-05:00) America/New_York',
    map: {
      summary_polyline:
        'qvt`GblaqLM|@FKNKl@MpAVz@Dt@`@TXXDd@]z@[jAeAVGTFLd@LNl@Dd@NNQFU@KTy@h@[\\TNCRLTVJ`@Zn@lATj@?jAb@bCAFHt@Jh@M`@C|@]xAKbBm@TUDY@GM_@Vw@AmBMWQSAIKCAYEGQQM]e@a@EWKMQs@B_@C@KeA[e@EYMEM_@Cc@FQ@k@I_@FVAf@CHYXg@Ps@Gy@o@WIQAu@iAu@s@m@U_Am@OOAMFmAQ_@]g@AWDw@HYLDAC@CCBG?Da@BMDKZMDUI[Bo@EEAKHUF_@GkAGU[SUe@CKCaA]}@]OKUBMMU?[KYGc@?Ye@eAGw@Du@AQAGOI@KKMF]C[DQKKUIQQISg@m@Qa@Qm@MCS_@@Ea@[C]BWAa@w@c@SUIQMKOc@_@MY[UcAM[s@aAI_AB[@eADSOqBIGIYMIy@aBMg@KSASEKOIMBIMCQMUECFSAYJi@`AKVFTW?IEICq@a@w@?YIe@FWl@QP?NMBGAKD]Ne@Ck@Y]GAAKUSCO][KWFU?SI_@D{@Sq@Ay@k@eCCI[AMM@e@DSd@Y^KVEf@@`@SJU`@RRb@XPTGPUv@[FKCKFCj@?PFJMNFDA@JJC~@kAn@IlAq@nAmBRsADMPWREHB~@jAxAvAR^VHNNNVMV?n@GFYAQBGJ^x@@PI\\@NCLLRAPDRCBBNLLLb@@ZIH?l@IRNh@Lz@Vx@AXQVAl@ARGHEp@?RLR?d@DP@nAIJId@@NHPLf@HxAG~@I\\B\\Cj@XdA?n@Fx@Hb@OrABrAEb@@j@CRRbBElAId@DpAFZE^Vv@LfAChAWpA?P`@B~@QJD_@r@W\\Q`@Q~@Qh@Ab@c@`CC|@Wd@Or@@NNf@TNBHEHH^Id@H^?nANT?LHXDX?ZBDAh@[lB@PTLlAb@dAjAb@\\N`@Ld@H|@Hf@?t@C\\H`A?^CRIJa@VS?eAUs@k@SKa@IQa@]e@s@k@]Oy@q@KWBy@Ce@o@y@i@Pe@^g@CsBs@UCa@L_@ZM\\YHMNOBMJq@Lk@`@GTCd@Sr@BRI`AMXu@`A[`AYZ[Ro@hAk@d@Uj@MLOX?XKr@BVCn@NLDTAXMZ?NHZIf@?^QTMl@KHA\\',
    },
    private: false,
    start_latlng: [42.218174, -71.118897],
    end_latlng: [42.21823, -71.119292],
  },
  {
    id: 104,
    name: 'Mount Whitney',
    distance: 30376.2,
    total_elevation_gain: 1347,
    type: 'Hike',
    sport_type: 'Hike',
    start_date: '2025-07-30T12:47:00Z',
    start_date_local: '2025-07-30T05:47:00Z',
    timezone: '(GMT-08:00) America/Los_Angeles',
    map: {
      summary_polyline:
        'umd~EzdjqUeBz@eA[q@iFsEAkCgFoAkLBoMV}FSsD{@qCSeJgCyAiBt@F_BgAkFxEiH~@Op@~@`@aAZeJ@aMeEcQ`@cDwBy@iCmIcD_CmAcEmG_HcBcFc@cGi@eAk@uQ@qGlA{Cr@`@t@m@h@}GnA{Bc@aH`@kFzFsDDiArA?v@eA`@Za@g@bDiGSyEjBuGxAMlBoBzAT|D}D`AgFrCeCv@EQkALgArAHSg@?c@v@cA}Ay@tMwC`GwCuINxLsGmHf@hIyGfAMmJp@vHwEe@_@oGfAnBwAaEl@xBmClEw@uH_CcEtClBiFcE`CeCJ{A{@eD|@mBgAcIzBuSoBmFqDaCMsEt@mEtDcE|FkBjGg@zHeBt@}EcFtAmChA}I_CeAwAiCc@yA|BjFvBjAkAvIoAjCpBvAzA`C~@?x@u@h@yHhBkGbEyF`GoExEa@xE|AhA`BbOx@|CbAhIeCjBrAzBkA~B~@nCQ`E_CwBdFtEoCnHlCb@_B`HkHIsJhAiKiA`BH}AwBvEBaBm@fBGkAw@jBJwDj@{Dd@y@}@`@Cz@Gy@Gz@Yi@?k@OtAGeCy@dCVsAs@uCgAhEFmGQf@J}@[Zl@mAYQf@QuAEr@oAmA`@n@oB{@p@`@gC]VTiA_@^t@{BaAx@h@sB{@bA\\cAWUw@d@f@}@_ABWq@\\UkCyAb@QHWw@g@V_CoAkB?eEeBcM`@e@yBiLaAyCgDqEi@}Do@T}@oIeDKb@qAkAq@}BcIPyAj@|Av@On@dDc@eP_A}ANa@e@g@r@iAeAi@kAuGeC_Dg@sBs@a@Qj@JeAi@kAKt@k@tBP`Bg@oB_C_A[^h@|AeAg@Xn@OJq@?sAcBeA?Ve@sEaC~@IgAYYmBjAXk@y@z@Ji@Sl@K_@YGU`@{@rE_FLyAoAsEsIuHSuAC_DbBqBcAZ}@KaA}BlAv@u@}@dA`@dA}BoCKQ]p@b@q@_@sAmF}D{AoArBDbByDb@_GG_AmCoCjDgIMdC_AfAsBuGpAiCw@bBMnCyBAm@oC\\XaAeBr@qDk@pBe@oAg@t@QV{AxB{BmDQqAdA_BaA_@g@v@?}Ak@wDuHeEyCxAEwA]aAgAzASsBUdAy@{C`@h@oAeErBYvAaA[gD{Hi@_EgFI?kDnAmDKyAmBqHiBs@fCPnFhJxCWZ{@d@t@P]',
    },
    private: false,
    start_latlng: [36.564275, -118.349738],
    end_latlng: [36.586951, -118.240185],
  },
  {
    id: 105,
    name: 'Katahdin via Cathedral',
    distance: 7847.5,
    total_elevation_gain: 1126.4,
    type: 'Hike',
    sport_type: 'Hike',
    start_date: '2019-08-20T12:26:51Z',
    start_date_local: '2019-08-20T08:26:51Z',
    timezone: '(GMT-05:00) America/New_York',
    map: {
      summary_polyline:
        'mehwGrnicLs@r@QXk@nAKt@@d@ELOhAY`A@Z]lAe@~@Qj@OnAN^PrCr@~AFVZx@t@z@RJDXR^BTnAtBPPEA@DE@DAA@ZPZ`@x@nCz@nBNl@@VGx@An@@r@Sz@BfCLvAL^@lBKlAK`@BtAJfA?hCGL@FCABEGA@D@CEXYl@GX@z@CH@lAMz@A`AHp@@rAA\\Hr@?r@BLDt@FVFt@@j@L|@@v@Fj@Cf@Dr@HZEFS`DGP?NJr@n@f@F|@MpA]|@MnADr@PdA?r@QdACl@B\\e@tBAZQbAA`@ETFVJJd@FNN@ZDTE?TRZHXr@B^FJCd@BxACZOfAUj@G`@YdA@Bo@vA[VINMr@IR]\\[l@KHUf@Ef@KZKbA@NEf@EJBVAn@ENF^Ah@BFCfIYnAJ|@I^BFAt@Pd@APTXDx@FBl@fALb@HNTJZn@ZFLNZPFP?FHLL@\\`@Ll@Dl@Ed@D?DP`@l@`@^f@JH`@@XCLBLN^NTJFNXDl@DLAL@NLRJfAAb@Db@\\lABFLHTp@?r@J~@\\jAJz@p@lAHl@`@TPZTB\\PpAzB^B\\b@Nb@x@z@XF~@x@N?TXj@PXRf@Hf@VN\\L@XTp@A?FB?[Kc@AOYCFCCUR]RQAXfBCNBPHBHRPRH`@Zj@VNV^BPRVNz@F?@NAfAFb@JZFb@J@Jj@\\t@BV@v@nAnBFd@AnAJNPJDPl@p@Pl@|@R@Ff@FBXELDPAPLFRZAl@DHGB@DFASl@FLSVBBGTMFBA@@CBV??EITb@L\\CDBw@@Qo@APDDE^DB@X@GAAD`@RVCHRVDVCA@CABJBANC?HVVLDPLBHLLBFJNCBOZ?HHCg@FKNh@PBBEDZFGHTC[LFAFPABFFBF?AEB?E?BAE@BBGCN@KABC?B@AEANBLJBSBD@HVST@VL@HJ@LRVLHCTHGPDLZFDNADLDEk@CADBAPEBB\\JRCDJ?Vh@HDJP@HDD?DTHCIFNNDBNCHHGDBNp@b@f@PNXH@HP?FJBE\\\\FHDTVd@DAd@Z`@JDB@Hx@HPRRHTTtAHTF?GJF?BLED?F^LLNI?EV?TILJPGVBZJt@IHLd@O\\q@Pk@BIAWDOJCDKRM@a@Pq@FKRiABi@^}@J_@b@aABK?GA?',
    },
    private: false,
    start_latlng: [45.922317, -68.866493],
    end_latlng: [45.904446, -68.921435],
  },
  {
    id: 106,
    name: 'My watch was paused almost the whole time because I wasn’t going fast enough',
    distance: 365.8,
    total_elevation_gain: 0,
    type: 'Hike',
    sport_type: 'Hike',
    start_date: '2022-12-29T14:06:54Z',
    start_date_local: '2022-12-29T09:06:54Z',
    timezone: '(GMT-05:00) America/New_York',
    map: {
      summary_polyline:
        'uhodGv{~vLeaBfvBFDjFiNBIACE?t@sCZSP[LCZQ^b@~@k@JMFW^M`@WNc@zH{GHQJeAvbAulAFa@Dk@h@mANk@KK',
    },
    private: false,
    start_latlng: [42.845711, -72.089071],
    end_latlng: [42.845693, -72.088623],
  },
  {
    id: 107,
    name: 'Cannon, uncursed',
    distance: 10950.6,
    total_elevation_gain: 765,
    type: 'Hike',
    sport_type: 'Hike',
    start_date: '2026-02-15T15:50:17Z',
    start_date_local: '2026-02-15T10:50:17Z',
    timezone: '(GMT-05:00) America/New_York',
    map: {
      summary_polyline:
        'iollGdaptL\\rBA\\Wn@KbAs@`AEv@Jp@X`@`@~AL|@lApBXJ`@z@JMZJd@d@HEICDLEIXQr@FnAzA~@[lA@`@Nl@AZVnBD`ALz@Td@VaA`@w@rAu@NQh@oA`AeA~AyAxAWBo@h@y@fAa@jAPCY?IOXH[XY?Yl@AP]VI\\Gd@Jf@n@`@^f@VlAKd@?|@KnBX~@Jr@LjCh@nC]bCTRFd@U}@}@d@qAfAk@dAq@N]d@Ip@MPDVc@XNCeBx@Ut@a@Zu@FQRSEYPg@bCHfCKp@A~@u@|AcATy@~@_@~@[j@M@DFcAf@S\\ARu@DWU}@d@c@Uq@P@GcBOSIAOGV_@e@qAb@m@BWC_ABOZ[Km@FCMsCCMPeDpAoBXOa@IeA{@eB_Aq@eA{CEqBJYEs@FGOGWqAH_@Q@RMEi@H@QQFa@QMAi@Oc@ICPSF_@QFH]Mq@e@k@Gg@iAUi@m@_@y@M{@]g@}@Oq@n@g@Ck@\\_@EoAkAuASmA}@_CFAQe@_@ODFSMTFDAMDNOANH@MAPASIVJKOIFEEFIDXe@IR?@HKAPKBHQ\\LVf@lCAp@x@bB\\v@d@b@d@ZY`AKp@m@~@DKJT@p@rB~@lAtAd@@\\VFNd@A|@Lf@QLCj@Xl@CWEGLb@ALICRE@S?P?MG@E^LRDVC[KZHI?T?QICNRHRKNHJCd@K?\\LWQEFLA?f@JVFM@LGFJPGCDTK|@HfBMFZd@TdAhB~AVdAGb@Pm@IVDITb@FnAJH`Dw@zBcA|@IPNdBGz@^HWn@U`A?PP`@O?Y`@EvAZb@EELHHtB]^`@TM@Uf@FlAORg@z@]@Qj@g@l@qAz@s@TBl@w@XeCK_ABiAXw@HgALSTO~AUZUHe@`@Ov@aAh@OH[v@JVNBAGOl@X~@k@dCmDGu@]cAIAP}@FmAEi@c@eA?iAOyA_@uACcAZaD[qAME[cAm@[D}@|@aBl@Kn@}Af@q@|CkCl@iAz@g@fA{A|AcB|@q@uAc@QJyB_@cCk@gAAq@Tm@s@cAi@c@CUX}@q@QNUi@{AaBg@iAc@}B[c@Sw@Dg@n@y@l@eBBu@Oo@OgE`@_CqBsCI@',
    },
    private: false,
    start_latlng: [44.142135, -71.685461],
    end_latlng: [44.142592, -71.683462],
  },
] as SummaryActivity[];

export const trips: Trip[] = [
  {
    name: 'Mt Isolation via Boott Spur',
    id: 123,
    url: 'https://mitoc-trips.mit.edu/trips/123/',
    program: '3-season hiking',
    primaryTripActivity: 'Hiking',
    tripDate: '2023-07-30',
    leaders: [
      {
        name: 'Ash Ketchum',
        id: 3,
        url: 'https://mitoc-trips.mit.edu/participants/3/',
      },
      {
        name: 'Joe Pesci',
        id: 2,
        url: 'https://mitoc-trips.mit.edu/participants/2/',
      },
      {
        name: 'Shannon Wheeler',
        id: 1,
        url: 'https://mitoc-trips.mit.edu/participants/1/',
      },
    ],
    description:
      "### Description\r\n\r\nLeaving *early* (4:00 am) Sunday morning, we'll be heading up to Boott Spur via the Lion Head route. From there, we'll continue south to visit Mt Isolation before coming down the Glen Boulder Trail.\r\n\r\n### Itinerary\r\n\r\n[Suggested trail map](https://www.komoot.com/plan/tour/d01AqNPNfvAxCA=FxjUBNZCQ-EkDZfP_FxG-2at45CKarzNtEfIw0Fw/@44.2541261,-71.2614965,13.110z). As it stands, this is about 13.5 miles of hiking with about 5k feet of elevation gain.\r\n\r\n### Note on difficulty\r\n\r\nThis is a hard hike. [The Lion Head route is steep](https://www.outdoorproject.com/united-states/new-hampshire/mount-washington-lion-head-trail-summer-route) and dangerous for newbies. For the entire party's safety, hikers will be vetted for this hike.\r\n\r\nIf the trail conditions are poor, we'll consider something easier (possibly going up Glen Boulder instead of Lion Head). \r\n\r\n### Weather\r\n\r\n[Mount Washington weather report](https://trailsnh.com/weather/n/2432687944/Mount-Washington-NH-Summit-Forecast).\r\n\r\n[Nearby city weather report](https://www.wunderground.com/forecast/us/nh/gorham)\r\n\r\nIf there is rain all Sunday, will the hike still happen? If the forecast is for light rain, yes (but make sure you have hiking rain gear).\r\n\r\nIf there is lightning in the forecast, will the hike still happen? We'll likely abort the trip if lightning can't be avoided, but possibly offer a hike in a different region with better weather.\r\n\r\n### Mandatory pre-trip meeting\r\n\r\nThursday evening, 8:00 pm\r\n\r\n### Other\r\n\r\nIf you have questions about the hike, feel free to email the trip leaders.",
  },
  {
    id: 456,
    name: 'Cool Cats on Cannon',
    url: 'https://mitoc-trips.mit.edu/trips/456/',
    program: 'Winter (outside IAP)',
    primaryTripActivity: 'Hiking',
    tripDate: '2026-02-15',
    leaders: [
      {
        name: 'Adam Driver',
        id: 6,
        url: 'https://mitoc-trips.mit.edu/participants/6/',
      },
      {
        name: 'Lionel Messi',
        id: 5,
        url: 'https://mitoc-trips.mit.edu/participants/5/',
      },
      {
        name: 'Seth Rogan',
        id: 4,
        url: 'https://mitoc-trips.mit.edu/participants/4/',
      },
    ],
    description:
      "Join us on Sunday for one of the most beautiful hikes in the Whites: Mt Cannon. We will stop by the beautiful lonesome lake on the way up. We will hike a total of 6 miles with 2400ft of elevation gain.\r\n\r\n**Prerequisites:** We likely won't have a pre-trip meeting so we expect you to be self-sufficient. We will maintain a moderate, steady pace with limited breaks.\r\n\r\nYou also will need to be a Winter School leader or have attended MITOC Winter Safety lectures within the past year, and have some winter hiking experience. If you have any questions or uncertainty about your preparedness, please reach out to us!\r\n\r\n**Logistics:** We will send you a bunch of spreadsheets to fill. Please read them carefully and fill it up on time. There won't be office hours so you are expected to arrange gear on your own if you are missing any. We will depart Cambridge Sunday morning (at a reasonable hour)!\r\n\r\n**Drivers and Lottery:** If you can drive your own car or are willing to drive, please update your lottery preferences to reflect this. Only mark “willing to drive/rent others” if you can commit to round-trip driving from the Boston/Cambridge area.\r\n\r\n**Costs:** Please budget for a $5 trip fee, $30–50 for carpooling costs, any personal gear rentals (capped at $15), and any food you purchase along the way. We will use the MIT car cost calculator and share costs equally among participants.",
  },
];
