import 'package:serverpod/serverpod.dart';

import '../generated/protocol.dart';

/// The Task endpoint handles CRUD operations for task management.
class TaskEndpoint extends Endpoint {
  // In-memory task storage for demonstration.
  // In production, use Serverpod's database integration.
  static final List<Task> _tasks = [];
  static int _nextId = 1;

  /// Returns all tasks.
  Future<List<Task>> getAllTasks(Session session) async {
    return List.from(_tasks);
  }

  /// Creates a new task and returns it.
  Future<Task> createTask(
    Session session,
    String title,
    String description,
    String priority,
    String category,
  ) async {
    final task = Task(
      taskId: _nextId++,
      title: title,
      description: description,
      priority: priority,
      category: category,
      isCompleted: false,
      createdAt: DateTime.now(),
    );
    _tasks.add(task);
    return task;
  }

  /// Toggles the completion status of a task.
  Future<bool> toggleTask(Session session, int taskId) async {
    final index = _tasks.indexWhere((t) => t.taskId == taskId);
    if (index == -1) return false;

    _tasks[index] = Task(
      taskId: _tasks[index].taskId,
      title: _tasks[index].title,
      description: _tasks[index].description,
      priority: _tasks[index].priority,
      category: _tasks[index].category,
      isCompleted: !_tasks[index].isCompleted,
      createdAt: _tasks[index].createdAt,
    );
    return true;
  }

  /// Deletes a task by its ID.
  Future<bool> deleteTask(Session session, int taskId) async {
    final index = _tasks.indexWhere((t) => t.taskId == taskId);
    if (index == -1) return false;
    _tasks.removeAt(index);
    return true;
  }

  /// Returns AI-suggested task priorities based on the current task list.
  Future<ButlerResponse> suggestPriorities(Session session) async {
    if (_tasks.isEmpty) {
      return ButlerResponse(
        message: 'You have no tasks yet. Add some tasks and I\'ll help you prioritize!',
        category: 'suggestion',
        timestamp: DateTime.now(),
      );
    }

    final incomplete = _tasks.where((t) => !t.isCompleted).toList();
    final urgent = incomplete.where((t) => t.priority == 'urgent').length;
    final high = incomplete.where((t) => t.priority == 'high').length;

    String suggestion;
    if (urgent > 0) {
      suggestion =
          'You have $urgent urgent task(s). I recommend tackling those first. '
          'You also have $high high-priority task(s) to address after.';
    } else if (high > 0) {
      suggestion =
          'No urgent tasks — great! Focus on your $high high-priority task(s) '
          'to make the most progress today.';
    } else {
      suggestion =
          'Your task list looks manageable! Consider working through tasks '
          'in order of their categories to maintain focus.';
    }

    return ButlerResponse(
      message: suggestion,
      category: 'suggestion',
      timestamp: DateTime.now(),
    );
  }
}
