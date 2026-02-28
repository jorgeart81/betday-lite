export interface BetsMe {
    readonly bets: Bet[];
}

export interface Bet {
    readonly id:       string;
    readonly matchId:  string;
    readonly placedAt: Date;
    readonly pick:     Pick;
    readonly odd:      number;
    readonly stake:    number;
    readonly status:   Status;
    readonly return:   number | null;
}

export type Pick = "AWAY" | "HOME" | "DRAW";

export type Status = "LOST" | "PENDING" | "WON";
