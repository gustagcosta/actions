import express from 'express';

import { authorization } from '../middleware.js';

const router = express.Router();

// @desc      Send all tasks to logged  user
// @route     GET /api/tasks
// @access    Common
router.get('/todo', authorization('common', 'admin'), async (req, res) => {
  res.json(req.db.select('*').from('tasks').where('id_target', '=', req.user.id))
});

// @desc      Send all tasks to manager
// @route     GET /api/tasks
// @access    Common
router.get(
  '/assigned',
  authorization('manager', 'admin'),
  async (req, res) => {
    res.json(req.db.select('*').from('tasks').where('id_manager', '=', req.user.id))  
  }
);

// @desc      Send task details
// @route     POST /api/tasks/
// @access    Common
router.get('/:id', authorization('common', 'admin'), async (req, res) => {
  res.json(req.db.select('*').from('tasks').where('id', '=', req.params.id))
});

// @desc      Store new task
// @route     POST /api/tasks/
// @access    Manager
router.post('/', authorization('manager', 'admin'), async (req, res) => {});

// @desc      Update a task
// @route     PUT /api/tasks/
// @access    Manager
router.put('/:id', authorization('admin', 'manager'), async (req, res) => {

});

// @desc      Delete a task
// @route     DELETE /api/tasks/
// @access    Manager
router.delete(
  '/:id',
  authorization('admin', 'manager'),
  async (req, res) => {

});

// @desc      Conclude a task
// @route     PATCH /api/tasks/:id
// @access    Common
router.patch('/:id', authorization('admin', 'common'), async (req, res) => {});

export default router;
