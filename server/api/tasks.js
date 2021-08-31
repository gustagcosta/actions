import express from 'express';

import { authorization } from '../middleware.js';

const router = express.Router();

// @desc      Send all tasks to logged  user
// @route     GET /api/tasks
// @access    Common
router.get('/', authorization('common', 'admin'), async (req, res) => {
  res.json(
    await req.db
      .select('tasks.*', { manager: 'users.name' })
      .from('tasks')
      .join('users', 'users.id', '=', 'tasks.id_manager')
      .where('id_target', '=', req.user.id)
  );
});

// @desc      Send task details
// @route     POST /api/tasks/
// @access    Common
router.get('/:id', authorization('common', 'admin'), async (req, res) => {
  res.json(req.db.select('*').from('tasks').where('id', '=', req.params.id));
});

// @desc      Store new task
// @route     POST /api/tasks/
// @access    Manager
router.post('/', authorization('manager', 'admin'), async (req, res) => {});

// @desc      Update a task
// @route     PUT /api/tasks/
// @access    Manager
router.put('/:id', authorization('admin', 'manager'), async (req, res) => {});

// @desc      Delete a task
// @route     DELETE /api/tasks/
// @access    Manager
router.delete(
  '/:id',
  authorization('admin', 'manager'),
  async (req, res) => {}
);

// @desc      Conclude a task
// @route     PATCH /api/tasks/:id
// @access    Common
router.patch('/:id', authorization('admin', 'common'), async (req, res) => {
  const { id } = req.params;
  try {
    await req.db('tasks').where('id', '=', id).update({
      status: 'DONE',
    });
    res.json({ message: 'Task updated' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

export default router;
