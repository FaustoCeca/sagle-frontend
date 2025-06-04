export interface UserDB {
    id: number;
    ipAddress: string;
    lastParticipation?: Date;
    hasParticipatedToday?: boolean;
    hasVotedToday?: boolean;
    idsAttemptedToday?: number[];
    streak?: number;
    isAdmin: boolean;
}