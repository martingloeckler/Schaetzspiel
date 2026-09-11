import type { Game, Question } from "../types/game.js";
export interface CreateGameInput{id:string;joinCode:string;hostId:string;showmasterMode:boolean;enabledCategories:string[];questions:Question[];}
export function createGame(input:CreateGameInput):Game{return{id:input.id,joinCode:input.joinCode,status:"LOBBY",hostId:input.hostId,showmasterMode:input.showmasterMode,enabledCategories:[...input.enabledCategories],questions:[...input.questions],currentQuestionIndex:0,players:[],answersByQuestion:new Map()};}
