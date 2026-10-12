import { Router } from 'express';
import Team from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response) => {
  const teams = await Team.find().populate('members', 'username displayName');
  response.json(teams);
});

export default router;
