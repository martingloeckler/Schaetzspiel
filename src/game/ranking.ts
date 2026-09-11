import type {Player,Question,RankedAnswer,RoundResult,SubmittedAnswer} from "../types/game.js";
export const calculateDeviation=(value:number,correctAnswer:number)=>Math.abs(value-correctAnswer);
export const pointsForRank=(rank:number)=>Math.max(0,11-rank);
const same=(a:RankedAnswer,b:RankedAnswer)=>a.deviation===b.deviation&&a.responseTimeMs===b.responseTimeMs;
export function rankAnswers(question:Question,answers:SubmittedAnswer[]):RankedAnswer[]{const ranked=answers.map<RankedAnswer>(a=>({...a,deviation:calculateDeviation(a.value,question.answer),rank:0,points:0})).sort((a,b)=>a.deviation-b.deviation||a.responseTimeMs-b.responseTimeMs||a.playerId.localeCompare(b.playerId));for(let i=0;i<ranked.length;i++){const c=ranked[i],p=ranked[i-1];c.rank=p&&same(c,p)?p.rank:i+1;c.points=pointsForRank(c.rank);}return ranked;}
export function buildRoundResult(question:Question,players:Player[],answers:SubmittedAnswer[]):RoundResult{const rankedAnswers=rankAnswers(question,answers),ids=new Set(answers.map(a=>a.playerId));return{questionId:question.id,correctAnswer:question.answer,rankedAnswers,unansweredPlayerIds:players.filter(p=>!ids.has(p.id)).map(p=>p.id)};}
export function applyRoundScores(players:Player[],result:RoundResult):Player[]{const pts=new Map(result.rankedAnswers.map(a=>[a.playerId,a.points]));return players.map(p=>({...p,totalScore:p.totalScore+(pts.get(p.id)??0)}));}
export function sortLeaderboard(players:Player[]):Player[]{return[...players].sort((a,b)=>b.totalScore-a.totalScore||a.name.localeCompare(b.name,"de"));}
