export type GameStatus="LOBBY"|"QUESTION"|"ROUND_RESULT"|"LEADERBOARD"|"FINISHED";
export type InputType="number"|"integer"|"duration";export type DurationFormat="mm:ss"|"hh:mm"|"hh:mm:ss";
export interface Question{id:string;category:string;text:string;answer:number;inputType:InputType;unit?:string;durationFormat?:DurationFormat;explanation?:string;}
export interface Player{id:string;name:string;totalScore:number;connected:boolean;isHost:boolean;}
export interface SubmittedAnswer{playerId:string;questionId:string;value:number;submittedAt:number;responseTimeMs:number;}
export interface RankedAnswer extends SubmittedAnswer{deviation:number;rank:number;points:number;}
export interface RoundResult{questionId:string;correctAnswer:number;rankedAnswers:RankedAnswer[];unansweredPlayerIds:string[];}
export interface Game{id:string;joinCode:string;status:GameStatus;hostId:string;showmasterMode:boolean;enabledCategories:string[];questions:Question[];currentQuestionIndex:number;players:Player[];answersByQuestion:Map<string,SubmittedAnswer[]>;questionStartedAt?:number;questionEndsAt?:number;}
