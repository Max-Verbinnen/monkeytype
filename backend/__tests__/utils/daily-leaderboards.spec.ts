import {
  initializeDailyLeaderboardsCache,
  getDailyLeaderboard,
} from "../../src/utils/daily-leaderboards";

const dailyLeaderboardsConfig = {
  enabled: true,
  maxResults: 3,
  leaderboardExpirationTimeInDays: 1,
  validModeRules: [
    {
      language: "(english|spanish)",
      mode: "time",
      mode2: "(15|60)",
    },
    {
      language: "french",
      mode: "words",
      mode2: "\\d+",
    },
  ],
  dailyLeaderboardCacheSize: 3,
  topResultsToAnnounce: 3,
  xpReward: 0,
};

describe("Daily Leaderboards", () => {
  it("should properly handle valid and invalid modes", () => {
    initializeDailyLeaderboardsCache(dailyLeaderboardsConfig);

    const modeCases = [
      {
        case: {
          language: "english",
          mode: "time",
          mode2: "60",
        },
        expected: true,
      },
      {
        case: {
          language: "spanish",
          mode: "time",
          mode2: "15",
        },
        expected: true,
      },
      {
        case: {
          language: "english",
          mode: "time",
          mode2: "600",
        },
        expected: false,
      },
      {
        case: {
          language: "spanish",
          mode: "words",
          mode2: "150",
        },
        expected: false,
      },
      {
        case: {
          language: "french",
          mode: "time",
          mode2: "600",
        },
        expected: false,
      },
      {
        case: {
          language: "french",
          mode: "words",
          mode2: "100",
        },
        expected: true,
      },
    ];

    modeCases.forEach(({ case: { language, mode, mode2 }, expected }) => {
      const result = getDailyLeaderboard(
        language,
        mode,
        mode2,
        dailyLeaderboardsConfig
      );
      expect(!!result).toBe(expected);
    });
  });

  // TODO: Setup Redis mock and test the rest of this
});
