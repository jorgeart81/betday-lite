export interface MatchesToday {
    readonly date:     Date;
    readonly timezone: string;
    readonly matches:  Match[];
}

export interface Match {
    readonly id:        string;
    readonly startTime: Date;
    readonly league:    League;
    readonly homeTeam:  Team;
    readonly awayTeam:  Team;
    readonly market:    Market;
}

export interface Team {
    readonly id:        string;
    readonly name:      string;
    readonly shortName: string;
}

export interface League {
    readonly id:      string;
    readonly name:    string;
    readonly country: string;
}


export interface Market {
    readonly type: Type;
    readonly odds: Odds;
}

export interface Odds {
    readonly home: number;
    readonly draw: number;
    readonly away: number;
}

export enum Type {
    The1X2 = "1X2",
}
