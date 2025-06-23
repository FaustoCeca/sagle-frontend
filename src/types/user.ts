export interface UserDB {
    id: string;
    ipAddress: string;
    lastParticipation?: Date;
    hasParticipatedToday?: boolean;
    hasVotedToday?: boolean;
    idsAttemptedToday?: number[];
    streak?: number;
    isAdmin: boolean;
}