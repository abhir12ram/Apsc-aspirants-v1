
import React from 'react';
import { 
    BookOpen, BarChart2, Edit, Archive, FileText, Calendar, Zap, Clock, MessageSquare, Mic
} from 'lucide-react';
import SyllabusNavigator from './views/SyllabusNavigator';
import CurrentAffairs from './views/CurrentAffairs';
import MCQPractice from './views/MCQPractice';
import PYQArchive from './views/PYQArchive';
import NotesOrganizer from './views/NotesOrganizer';
import StrategyPlanner from './views/StrategyPlanner';
import GKBooster from './views/GKBooster';
import Timeline from './views/Timeline';
import EssayPad from './views/EssayPad';
import InterviewPrep from './views/InterviewPrep';


export interface Tool {
  id: string;
  title: string;
  description: string;
  Icon: React.ElementType;
}

export const toolComponents: { [key: string]: React.ComponentType<any> } = {
  syllabus: SyllabusNavigator,
  currentAffairs: CurrentAffairs,
  mcq: MCQPractice,
  pyq: PYQArchive,
  notes: NotesOrganizer,
  planner: StrategyPlanner,
  gk: GKBooster,
  timeline: Timeline,
  essay: EssayPad,
  interview: InterviewPrep,
};


export const tools: Tool[] = [
  { id: 'syllabus', title: 'Syllabus Navigator', description: 'Explore the full Prelims & Mains syllabus.', Icon: BookOpen },
  { id: 'currentAffairs', title: 'Daily Current Affairs', description: 'Stay updated with categorized news.', Icon: BarChart2 },
  { id: 'mcq', title: 'MCQ Practice Test', description: 'Generate tests with AI on any topic.', Icon: Edit },
  { id: 'pyq', title: 'PYQ Archive', description: 'Browse past 10 years of questions.', Icon: Archive },
  { id: 'notes', title: 'Study Notes Organizer', description: 'Create, edit, and tag your notes.', Icon: FileText },
  { id: 'planner', title: 'Exam Strategy Planner', description: 'Plan your weekly & monthly studies.', Icon: Calendar },
  { id: 'gk', title: 'Static GK Booster', description: 'Boost your GK with flashcards.', Icon: Zap },
  { id: 'timeline', title: 'Important Dates Timeline', description: 'Visualize key historical events.', Icon: Clock },
  { id: 'essay', title: 'Article & Essay Practice', description: 'A minimal pad for writing practice.', Icon: MessageSquare },
  { id: 'interview', title: 'Mock Interview Prep', description: 'Prepare for the final stage.', Icon: Mic },
];

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export interface PYQ {
  id: number;
  year: number;
  exam: 'Prelims' | 'Mains';
  subject: string;
  question: string;
}

export interface PlannerTask {
  id: string;
  text: string;
  completed: boolean;
}
