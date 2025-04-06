document.addEventListener('DOMContentLoaded', function () {
    const widget = document.getElementById('widget');
    let currentLeagueIndex = 0;
    let currentMatchIndex = 0;

    const leagues = [
        {
            name: 'NHL',
            logo: 'https://www.sportslogos.net/logos/1/1/full/nhl.png',
            playoffs: [
                { team1: 'EDM', team1Score: 3, team2: 'CGY', team1Logo: 'https://www.sportslogos.net/logos/1/6/full/2018_edmonton_oilers-primary_2018.png', team2Logo: 'https://www.sportslogos.net/logos/1/5/full/2020_calgary_flames-primary_2020.png', timeRemaining: '10:00', period: '2OT', round: 'First Round', gameNumber: 'Game 1' },
                { team1: 'PIT', team1Score: 4, team2: 'PHI', team1Logo: 'https://www.sportslogos.net/logos/1/13/full/2017_pittsburgh_penguins-primary_2017.png', team2Logo: 'https://www.sportslogos.net/logos/1/16/full/2017_philadelphia_flyers-primary_2017.png', timeRemaining: '00:30', period: 'Final OT', round: 'Western Conference Final', gameNumber: 'Game 7' },
                // Add more playoff matches here
            ]
        },
        {
            name: 'NBA',
            logo: 'https://www.sportslogos.net/logos/6/209/full/nba.png',
            playoffs: [
                { team1: 'GSW', team1Score: 98, team2: 'LAC', team1Logo: 'https://www.sportslogos.net/logos/6/235/full/7024_golden_state_warriors-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/6/236/full/7025_los_angeles_clippers-primary_2020.png', timeRemaining: '05:25', period: 'Final OT', round: 'NBA Finals', gameNumber: 'Game 5' },
                { team1: 'BOS', team1Score: 105, team2: 'MIA', team1Logo: 'https://www.sportslogos.net/logos/6/213/full/7861_miami_heat-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/6/213/full/7861_miami_heat-primary_2020.png', timeRemaining: '02:45', period: 'Final 2OT', round: 'Eastern Conference Final', gameNumber: 'Game 6' },
                // Add more playoff matches here
            ]
        },
        {
            name: 'MLB',
            logo: 'https://www.sportslogos.net/logos/4/5049/full/mlb.png',
            playoffs: [
                { team1: 'ATL', team1Score: 4, team2: 'PHI', team1Logo: 'https://www.sportslogos.net/logos/54/51/full/1259_atlanta_braves-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/54/52/full/1260_philadelphia_phillies-primary_2020.png', timeRemaining: 'Top 10th', period: 'Final 10th', round: 'NLDS', gameNumber: 'Game 3' },
                { team1: 'HOU', team1Score: 3, team2: 'NYY', team1Logo: 'https://www.sportslogos.net/logos/53/4929/full/1253_houston_astros-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/53/68/full/1252_new_york_yankees-primary_2020.png', timeRemaining: 'Bottom 11th', period: 'Final 11th', round: 'ALCS', gameNumber: 'Game 4' },
                // Add more playoff matches here
            ]
        },
        {
            name: 'NFL',
            logo: 'https://www.sportslogos.net/logos/7/1000/full/nfl.png',
            playoffs: [
                { team1: 'KC', team1Score: 24, team2: 'BUF', team1Logo: 'https://www.sportslogos.net/logos/7/162/full/8575_kansas_city_chiefs-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/7/121/full/9198_buffalo_bills-primary_2020.png', timeRemaining: '01:15', period: 'Final 2OT', round: 'Divisional Round' },
                { team1: 'TB', team1Score: 31, team2: 'GB', team1Logo: 'https://www.sportslogos.net/logos/7/176/full/8221_tampa_bay_buccaneers-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/7/171/full/920_green_bay_packers-primary_2020.png', timeRemaining: '00:45', period: 'Final OT', round: 'NFC Championship' },
                // Add more playoff matches here
            ]
        }
    ];

    function updateWidget() {
        const league = leagues[currentLeagueIndex];
        const match = league.playoffs[currentMatchIndex];

        document.getElementById('league-name').textContent = league.name;
        document.getElementById('league-logo').src = league.logo;
        document.getElementById('team1-logo').src = match.team1Logo;
        document.getElementById('team2-logo').src = match.team2Logo;
        document.getElementById('team1-abbreviation').textContent = match.team1;
        document.getElementById('team1-score').textContent = match.team1Score;
        document.getElementById('team2-abbreviation').textContent = match.team2;
        document.getElementById('team2-score').textContent = match.team2Score;

        const timeRemainingElement = document.getElementById('time-remaining');
        if (match.period.startsWith('Final')) {
            let finalText = 'Final';
            if (match.period === 'Final OT') {
                finalText = 'Final OT';
            } else if (match.period === 'Final SO') {
                finalText = 'Final SO';
            }
            timeRemainingElement.textContent = finalText;
        } else {
            let periodText = '';
            if (match.period === '2OT') {
                periodText = ` (${match.period})`;
            } else if (match.period === 'SO') {
                periodText = ` (${match.period})`;
            } else {
                periodText = match.period ? ` (${match.period})` : '';
            }

            if (league.name === 'NFL') {
                timeRemainingElement.textContent = match.timeRemaining + periodText;
            } else {
                timeRemainingElement.textContent = match.timeRemaining + periodText + ' ' + match.gameNumber;
            }
        }

        if (match.round) {
            document.getElementById('round-name').textContent = match.round;
        } else {
            document.getElementById('round-name').textContent = '';
        }
    }

    function handleSwipe(direction) {
        console.log(`Swipe detected: ${direction}`);
        if (direction === 'left' || direction === 'right') {
            if (direction === 'left') {
                currentLeagueIndex = (currentLeagueIndex - 1 + leagues.length) % leagues.length;
            } else {
                currentLeagueIndex = (currentLeagueIndex + 1) % leagues.length;
            }
            currentMatchIndex = 0; // Reset match index when league changes
        } else if (direction === 'up' || direction === 'down') {
            const matches = leagues[currentLeagueIndex].playoffs;
            if (direction === 'up') {
                currentMatchIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
            } else {
                currentMatchIndex = (currentMatchIndex + 1) % matches.length;
            }
        }

        updateWidget();
    }

    const hammer = new Hammer(widget);
    hammer.on('swipeleft', () => handleSwipe('left'));
    hammer.on('swiperight', () => handleSwipe('right'));
    hammer.on('swipeup', () => handleSwipe('up'));
    hammer.on('swipedown', () => handleSwipe('down'));

    // WebSocket setup for real-time updates
    const socket = new WebSocket('wss://api.sportdevs.com/live-scores');

    socket.onopen = function (event) {
        console.log('WebSocket connection established:', event);
    };

    socket.onerror = function (error) {
        console.error('WebSocket Error: ', error);
    };

    socket.onmessage = function (event) {
        console.log('WebSocket message event:', event);
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        const league = leagues.find(l => l.name === data.league);
        if (league) {
            const match = league.playoffs.find(m => m.team1 === data.team1 && m.team2 === data.team2);
            if (match) {
                match.team1Score = data.team1Score;
                match.team2Score = data.team2Score;
                match.timeRemaining = data.timeRemaining;
                match.period = data.period;
                match.round = data.round;
                match.gameNumber = data.gameNumber;
                console.log('Match updated with new scores:', match);
                if (currentLeagueIndex === leagues.indexOf(league) && currentMatchIndex === league.playoffs.indexOf(match)) {
                    updateWidget();
                }
            } else {
                console.warn('Match not found for data:', data);
            }
        } else {
            console.warn('League not found for data:', data);
        }
    };

    updateWidget();
});
