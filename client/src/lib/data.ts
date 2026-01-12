import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Types ---

export interface Dancer {
  id: string;
  firstName: string;
  lastName: string; // Will be masked in UI
  dateOfBirth: string;
  age: number; // Competition age
  image?: string;
}

export interface Routine {
  id: string;
  name: string;
  style: 'Jazz' | 'Lyrical' | 'Contemporary' | 'Tap' | 'Hip Hop' | 'Musical Theatre' | 'Ballet' | 'Open';
  type: 'Solo' | 'Duet' | 'Trio' | 'Small Group' | 'Large Group' | 'Line' | 'Production';
  level: 'Novice' | 'Intermediate' | 'Elite';
  duration: string; // e.g., "2:45"
  dancerIds: string[];
}

export interface Competition {
  id: string;
  name: string;
  location: string;
  dates: string; // e.g., "Mar 15-17, 2025"
  imageUrl?: string;
}

export interface RunSheetSlot {
  id: string;
  competitionId: string;
  orderNumber: number;
  time: string; // e.g. "8:15 AM"
  day: 'Friday' | 'Saturday' | 'Sunday';
  stage: 'Main Stage' | 'Stage 2';
  routineId: string;
  notes?: string;
}

// --- Helper Functions ---

export function maskName(firstName: string, lastName: string): string {
  if (!lastName) return firstName;
  const maskedLast = lastName.length > 2 ? lastName.substring(0, 3) : lastName.substring(0, 1);
  return `${firstName} ${maskedLast}.`;
}

// --- Seed Data ---

const SEED_DANCERS: Dancer[] = [
  { id: 'd1', firstName: 'Emma', lastName: 'Thompson', dateOfBirth: '2012-05-15', age: 12 },
  { id: 'd2', firstName: 'Sophia', lastName: 'Rodriguez', dateOfBirth: '2010-11-20', age: 14 },
  { id: 'd3', firstName: 'Ava', lastName: 'Chen', dateOfBirth: '2011-03-10', age: 13 },
  { id: 'd4', firstName: 'Mia', lastName: 'Williams', dateOfBirth: '2013-07-22', age: 11 },
  { id: 'd5', firstName: 'Isabella', lastName: 'Martinez', dateOfBirth: '2009-09-05', age: 15 },
  { id: 'd6', firstName: 'Charlotte', lastName: 'Anderson', dateOfBirth: '2012-01-30', age: 13 },
  { id: 'd7', firstName: 'Amelia', lastName: 'Taylor', dateOfBirth: '2014-06-18', age: 10 },
  { id: 'd8', firstName: 'Harper', lastName: 'Thomas', dateOfBirth: '2008-12-12', age: 16 },
  { id: 'd9', firstName: 'Evelyn', lastName: 'Hernandez', dateOfBirth: '2010-04-04', age: 14 },
  { id: 'd10', firstName: 'Abigail', lastName: 'Moore', dateOfBirth: '2011-08-25', age: 13 },
];

const SEED_ROUTINES: Routine[] = [
  { id: 'r1', name: 'Golden Hour', style: 'Lyrical', type: 'Small Group', level: 'Elite', duration: '2:45', dancerIds: ['d1', 'd2', 'd3', 'd6', 'd9', 'd10'] },
  { id: 'r2', name: 'Rhythm Nation', style: 'Jazz', type: 'Large Group', level: 'Elite', duration: '3:15', dancerIds: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10'] },
  { id: 'r3', name: 'Found', style: 'Contemporary', type: 'Solo', level: 'Elite', duration: '2:30', dancerIds: ['d5'] },
  { id: 'r4', name: 'Ease On Down', style: 'Musical Theatre', type: 'Duet', level: 'Intermediate', duration: '2:40', dancerIds: ['d4', 'd7'] },
  { id: 'r5', name: 'Zero to Hero', style: 'Tap', type: 'Small Group', level: 'Novice', duration: '2:50', dancerIds: ['d1', 'd4', 'd7', 'd6'] },
  { id: 'r6', name: 'Vogue', style: 'Jazz', type: 'Solo', level: 'Elite', duration: '2:30', dancerIds: ['d8'] },
  { id: 'r7', name: 'Waves', style: 'Contemporary', type: 'Trio', level: 'Elite', duration: '2:45', dancerIds: ['d2', 'd3', 'd9'] },
  { id: 'r8', name: 'Get Low', style: 'Hip Hop', type: 'Large Group', level: 'Elite', duration: '3:30', dancerIds: ['d1', 'd2', 'd3', 'd5', 'd6', 'd8', 'd9', 'd10'] },
];

const SEED_COMPETITIONS: Competition[] = [
  { id: 'c0', name: 'Winter Showcase', location: 'Philadelphia, PA', dates: 'Dec 1-3, 2023' },
  { id: 'c3', name: 'WCDE Biloxi', location: 'Biloxi, MS', dates: 'Dec 5-7, 2025' },
  { id: 'c1', name: 'StarPower Baltimore', location: 'Baltimore Convention Center', dates: 'Mar 15-17, 2025' },
  { id: 'c2', name: 'Believe Talent', location: 'Ocean City, MD', dates: 'Apr 4-6, 2025' },
];

const SEED_RUN_SHEET: RunSheetSlot[] = [
  // WCDE Biloxi (New from PDF)
  { id: 'biloxi-1', competitionId: 'c3', orderNumber: 1, time: '8:00 AM', day: 'Friday', stage: 'Main Stage', routineId: 'r2', notes: 'Party In The USA - Open with high energy!' },
  { id: 'biloxi-2', competitionId: 'c3', orderNumber: 8, time: '8:15 AM', day: 'Friday', stage: 'Main Stage', routineId: 'r1', notes: 'Time - Contemporary Solo' },
  { id: 'biloxi-3', competitionId: 'c3', orderNumber: 11, time: '8:23 AM', day: 'Friday', stage: 'Main Stage', routineId: 'r5', notes: 'Constellations - Lyrical Solo' },
  { id: 'biloxi-4', competitionId: 'c3', orderNumber: 24, time: '9:10 AM', day: 'Friday', stage: 'Main Stage', routineId: 'r4', notes: 'My Kind Of Guy - Junior Jazz' },
  
  // Past Competition (Dec)
  { id: 'rs-old-1', competitionId: 'c0', orderNumber: 10, time: '8:00 AM', day: 'Friday', stage: 'Main Stage', routineId: 'r1', notes: 'Great start to the season!' },
  { id: 'rs-old-2', competitionId: 'c0', orderNumber: 25, time: '10:30 AM', day: 'Friday', stage: 'Main Stage', routineId: 'r2' },
  { id: 'rs-old-3', competitionId: 'c0', orderNumber: 42, time: '1:15 PM', day: 'Friday', stage: 'Main Stage', routineId: 'r3', notes: 'Nailed the turn sequence.' },
  
  // Current Competition (Mar)
  { id: 'rs1', competitionId: 'c1', orderNumber: 104, time: '9:15 AM', day: 'Saturday', stage: 'Main Stage', routineId: 'r5', notes: 'Make sure tap shoes are double knotted!' },
  { id: 'rs2', competitionId: 'c1', orderNumber: 122, time: '10:45 AM', day: 'Saturday', stage: 'Main Stage', routineId: 'r4' },
  { id: 'rs3', competitionId: 'c1', orderNumber: 156, time: '1:30 PM', day: 'Saturday', stage: 'Main Stage', routineId: 'r1', notes: 'Watch spacing on the left wing entrance.' },
  { id: 'rs4', competitionId: 'c1', orderNumber: 201, time: '4:15 PM', day: 'Saturday', stage: 'Stage 2', routineId: 'r3' },
  { id: 'rs5', competitionId: 'c1', orderNumber: 215, time: '5:30 PM', day: 'Saturday', stage: 'Stage 2', routineId: 'r6' },
  { id: 'rs6', competitionId: 'c1', orderNumber: 305, time: '9:00 AM', day: 'Sunday', stage: 'Main Stage', routineId: 'r7' },
  { id: 'rs7', competitionId: 'c1', orderNumber: 342, time: '11:15 AM', day: 'Sunday', stage: 'Main Stage', routineId: 'r2', notes: 'Hairpiece checks before lineup!' },
  { id: 'rs8', competitionId: 'c1', orderNumber: 388, time: '3:45 PM', day: 'Sunday', stage: 'Main Stage', routineId: 'r8' },
];

// --- Store ---

interface AppState {
  dancers: Dancer[];
  routines: Routine[];
  competitions: Competition[];
  runSheet: RunSheetSlot[];
  updateSlotNotes: (slotId: string, notes: string) => void;
  getDancer: (id: string) => Dancer | undefined;
  getRoutine: (id: string) => Routine | undefined;
  getCompetition: (id: string) => Competition | undefined;
  getRoutinesForDancer: (dancerId: string) => Routine[];
  getDancersForRoutine: (routineId: string) => Dancer[];
  getRunSheetForCompetition: (competitionId: string) => RunSheetSlot[];
  getSlotsForRoutine: (routineId: string) => RunSheetSlot[];
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      dancers: SEED_DANCERS,
      routines: SEED_ROUTINES,
      competitions: SEED_COMPETITIONS,
      runSheet: SEED_RUN_SHEET,

      updateSlotNotes: (slotId, notes) =>
        set((state) => ({
          runSheet: state.runSheet.map((slot) =>
            slot.id === slotId ? { ...slot, notes } : slot
          ),
        })),

      getDancer: (id) => get().dancers.find((d) => d.id === id),
      getRoutine: (id) => get().routines.find((r) => r.id === id),
      getCompetition: (id) => get().competitions.find((c) => c.id === id),

      getRoutinesForDancer: (dancerId) =>
        get().routines.filter((r) => r.dancerIds.includes(dancerId)),

      getDancersForRoutine: (routineId) => {
        const routine = get().routines.find((r) => r.id === routineId);
        if (!routine) return [];
        return get().dancers.filter((d) => routine.dancerIds.includes(d.id));
      },
      
      getRunSheetForCompetition: (competitionId) =>
        get().runSheet
          .filter((s) => s.competitionId === competitionId)
          .sort((a, b) => a.orderNumber - b.orderNumber), // Simple sort by order number
          
      getSlotsForRoutine: (routineId) =>
        get().runSheet.filter((s) => s.routineId === routineId),
    }),
    {
      name: 'dance-studio-storage',
      partialize: (state) => ({ runSheet: state.runSheet }), // Only persist changes to run sheet (notes) for now, can expand later if we add CRUD for others
    }
  )
);
