document.addEventListener('DOMContentLoaded', function () {
    const widget = document.getElementById('widget');
    let currentLeagueIndex = 0;
    let currentMatchIndex = 0;

    const leagues = [
        {
            name: 'NHL',
            logo: 'https://www.sportslogos.net/logos/1/1/full/nhl.png',
            matches: [
                { team1: 'MTL', team1Score: 1, team2: 'TOR', team1Logo: 'https://www.sportslogos.net/logos/1/1736/full/4010_montreal_canadiens-primary_2018.png', team2Logo: 'https://www.sportslogos.net/logos/1/28/full/4021_toronto_maple_leafs-primary_2021.png', timeRemaining: '05:30' },
                { team1: 'BOS', team1Score: 2, team2: 'NYR', team1Logo: 'https://www.sportslogos.net/logos/1/3/full/2_boston_bruins-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/1/10/full/2_new_york_rangers-primary_2021.png', timeRemaining: '07:15' },
                // Add more matches here
            ]
        },
        {
            name: 'NBA',
            logo: 'https://www.sportslogos.net/logos/6/209/full/nba.png',
            matches: [
                { team1: 'LAL', team1Score: 102, team2: 'BKN', team1Logo: 'https://www.sportslogos.net/logos/6/237/full/833_los_angeles_lakers-primary_2021.png', team2Logo: 'https://www.sportslogos.net/logos/6/378/full/6662_brooklyn_nets-primary_2020.png', timeRemaining: '03:45' },
                { team1: 'MIA', team1Score: 110, team2: 'ATL', team1Logo: 'https://www.sportslogos.net/logos/6/213/full/7861_miami_heat-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/6/220/full/7454_atlanta_hawks-primary_2020.png', timeRemaining: '01:30' },
                // Add more matches here
            ]
        },
        {
            name: 'MLB',
            logo: 'https://www.sportslogos.net/logos/4/5049/full/mlb.png',
            matches: [
                { team1: 'NYY', team1Score: 5, team2: 'BOS', team1Logo: 'https://www.sportslogos.net/logos/53/68/full/1252_new_york_yankees-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/53/63/full/1251_boston_red_sox-primary_2020.png', timeRemaining: 'Top 7th' },
                { team1: 'LAD', team1Score: 7, team2: 'SFG', team1Logo: 'https://www.sportslogos.net/logos/54/73/full/1308_los_angeles_dodgers-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/54/74/full/1309_san_francisco_giants-primary_2020.png', timeRemaining: 'Bottom 8th' },
                // Add more matches here
            ]
        },
        {
            name: 'NFL',
            logo: 'https://www.sportslogos.net/logos/7/1000/full/nfl.png',
            matches: [
                { team1: 'NE', team1Score: 21, team2: 'NYJ', team1Logo: 'https://www.sportslogos.net/logos/7/170/full/8566_new_england_patriots-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/7/152/full/9112_new_york_jets-primary_2020.png', timeRemaining: '04:45' },
                { team1: 'DAL', team1Score: 28, team2: 'WAS', team1Logo: 'https://www.sportslogos.net/logos/7/165/full/920_dallas_cowboys-primary_2020.png', team2Logo: 'https://www.sportslogos.net/logos/7/168/full/1717_washington_football_team-primary_2020.png', timeRemaining: '02:30' },
                // Add more matches here
            ]
        }
    ];

    function updateWidget() {
        const league = leagues[currentLeagueIndex];
        const match = league.matches[currentMatchIndex];

        document.getElementById('league-name').textContent = league.name;
        document.getElementById('league-logo').src = league.logo;
        document.getElementById('team1-logo').src = match.team1Logo;
        document.getElementById('team2-logo').src = match.team2Logo;
        document.getElementById('team1-abbreviation').textContent = match.team1;
        document.getElementById('team1-score').textContent = match.team1Score;
        document.getElementById('team2-abbreviation').textContent = match.team2;
        document.getElementById('team2-score').textContent = match.team2Score;
        document.getElementById('time-remaining').textContent = match.timeRemaining;
    }

    function handleSwipe(direction) {
        console.log(`Swipe detected: ${direction}`);
        if (direction === 'left' || 'right') {
            if (direction === 'left') {
                currentLeagueIndex = (currentLeagueIndex - 1 + leagues.length) % leagues.length;
            } else {
                currentLeagueIndex = (currentLeagueIndex + 1) % leagues.length;
            }
            currentMatchIndex = 0; // Reset match index when league changes
        } else if (direction === 'up' || 'down') {
            const matches = leagues[currentLeagueIndex].matches;
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
        console.log('WebSocket connection established');
    };

    socket.onerror = function (error) {
        console.error('WebSocket Error: ', error);
    };

    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        const league = leagues find(l => l.name === data.league);
        if (league) {
            const match = league.matches find(m => m.team1 === data.team1 && m.team2 === data.team2);
            if (match) {
                match.team1Score = data.team1Score;
                match.team2Score = data.team2Score;
                match.timeRemaining = data.timeRemaining;
                if (currentLeagueIndex === leagues.indexOf(league) && currentMatchIndex === league.matches.indexOf(match)) {
                    updateWidget();
                }
            }
        }
    };

    updateWidget();
});
