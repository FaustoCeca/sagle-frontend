export interface UserDB {
    id: number;
    ipAddress: string;
    lastParticipation?: Date;
    hasParticipatedToday?: boolean;
    hasVotedToday?: boolean;
    streak?: number;
    isAdmin: boolean;
}