import mongoose, { Types } from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

// Seed the octofit_db database with test data
const ids = {
  teams: {
    trailblazers: new Types.ObjectId('671000000000000000000001'),
    nightOwls: new Types.ObjectId('671000000000000000000002'),
  },
  users: {
    alex: new Types.ObjectId('671000000000000000000011'),
    jordan: new Types.ObjectId('671000000000000000000012'),
    sam: new Types.ObjectId('671000000000000000000013'),
  },
  activities: {
    alex: new Types.ObjectId('671000000000000000000021'),
    jordan: new Types.ObjectId('671000000000000000000022'),
    sam: new Types.ObjectId('671000000000000000000023'),
  },
  leaderboard: {
    alex: new Types.ObjectId('671000000000000000000031'),
    jordan: new Types.ObjectId('671000000000000000000032'),
    sam: new Types.ObjectId('671000000000000000000033'),
  },
  workouts: {
    cardio: new Types.ObjectId('671000000000000000000041'),
    strength: new Types.ObjectId('671000000000000000000042'),
    recovery: new Types.ObjectId('671000000000000000000043'),
  },
};

const teams = [
  {
    _id: ids.teams.trailblazers,
    name: 'Trailblazers',
    description: 'Outdoor miles and weekend adventures.',
    members: [ids.users.alex, ids.users.sam],
    points: 245,
  },
  {
    _id: ids.teams.nightOwls,
    name: 'Night Owls',
    description: 'Evening workouts and consistent progress.',
    members: [ids.users.jordan],
    points: 190,
  },
];

const users = [
  {
    _id: ids.users.alex,
    username: 'alex.runner',
    email: 'alex.runner@example.com',
    displayName: 'Alex Rivera',
    team: ids.teams.trailblazers,
  },
  {
    _id: ids.users.jordan,
    username: 'jordan.moves',
    email: 'jordan.moves@example.com',
    displayName: 'Jordan Lee',
    team: ids.teams.nightOwls,
  },
  {
    _id: ids.users.sam,
    username: 'sam.active',
    email: 'sam.active@example.com',
    displayName: 'Sam Patel',
    team: ids.teams.trailblazers,
  },
];

const activities = [
  {
    _id: ids.activities.alex,
    user: ids.users.alex,
    type: 'Running',
    durationMinutes: 36,
    distanceKilometers: 5.2,
    calories: 410,
    completedAt: new Date('2026-10-10T08:00:00.000Z'),
  },
  {
    _id: ids.activities.jordan,
    user: ids.users.jordan,
    type: 'Cycling',
    durationMinutes: 45,
    distanceKilometers: 14,
    calories: 520,
    completedAt: new Date('2026-10-11T17:30:00.000Z'),
  },
  {
    _id: ids.activities.sam,
    user: ids.users.sam,
    type: 'Walking',
    durationMinutes: 50,
    distanceKilometers: 4.1,
    calories: 230,
    completedAt: new Date('2026-10-12T07:15:00.000Z'),
  },
];

const leaderboard = [
  { _id: ids.leaderboard.alex, user: ids.users.alex, team: ids.teams.trailblazers, period: '2026-W41', points: 120 },
  { _id: ids.leaderboard.jordan, user: ids.users.jordan, team: ids.teams.nightOwls, period: '2026-W41', points: 110 },
  { _id: ids.leaderboard.sam, user: ids.users.sam, team: ids.teams.trailblazers, period: '2026-W41', points: 95 },
];

const workouts = [
  {
    _id: ids.workouts.cardio,
    name: 'Steady-State Run',
    description: 'A comfortable, conversational-pace run to build aerobic endurance.',
    activityType: 'Running',
    difficulty: 'beginner',
    durationMinutes: 30,
  },
  {
    _id: ids.workouts.strength,
    name: 'Full-Body Strength',
    description: 'A balanced bodyweight circuit with controlled rests between rounds.',
    activityType: 'Strength',
    difficulty: 'intermediate',
    durationMinutes: 35,
  },
  {
    _id: ids.workouts.recovery,
    name: 'Mobility Reset',
    description: 'Gentle mobility work focused on hips, shoulders, and the back.',
    activityType: 'Mobility',
    difficulty: 'beginner',
    durationMinutes: 15,
  },
];

async function insertMissingSeedRecords<T extends { _id: Types.ObjectId }>(
  collectionName: string,
  records: T[],
  findExisting: (recordIds: Types.ObjectId[]) => Promise<Array<{ _id: Types.ObjectId }>>,
  insertMany: (missingRecords: T[]) => Promise<unknown>,
) {
  const existing = await findExisting(records.map(({ _id }) => _id));
  const existingIds = new Set(existing.map(({ _id }) => String(_id)));
  const missing = records.filter(({ _id }) => !existingIds.has(String(_id)));

  if (missing.length > 0) {
    await insertMany(missing);
    console.log(`Added ${missing.length} ${collectionName} records`);
  } else {
    console.log(`Seed records already present for ${collectionName}`);
  }
}

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await insertMissingSeedRecords(
      'teams',
      teams,
      (recordIds) => Team.find({ _id: { $in: recordIds } }).select('_id').lean(),
      (records) => Team.insertMany(records),
    );
    await insertMissingSeedRecords(
      'users',
      users,
      (recordIds) => User.find({ _id: { $in: recordIds } }).select('_id').lean(),
      (records) => User.insertMany(records),
    );
    await insertMissingSeedRecords(
      'activities',
      activities,
      (recordIds) => Activity.find({ _id: { $in: recordIds } }).select('_id').lean(),
      (records) => Activity.insertMany(records),
    );
    await insertMissingSeedRecords(
      'leaderboards',
      leaderboard,
      (recordIds) => Leaderboard.find({ _id: { $in: recordIds } }).select('_id').lean(),
      (records) => Leaderboard.insertMany(records),
    );
    await insertMissingSeedRecords(
      'workouts',
      workouts,
      (recordIds) => Workout.find({ _id: { $in: recordIds } }).select('_id').lean(),
      (records) => Workout.insertMany(records),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
