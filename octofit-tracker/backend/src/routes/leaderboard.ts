import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  const entries = await Leaderboard.find()
    .populate('user', 'username displayName')
    .populate('team', 'name')
    .sort({ points: -1 });
  response.json(entries);
});

export default router;
