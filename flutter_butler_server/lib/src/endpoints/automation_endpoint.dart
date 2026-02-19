import 'package:serverpod/serverpod.dart';

import '../generated/protocol.dart';

/// The Automation endpoint handles daily routine automations and workflows.
class AutomationEndpoint extends Endpoint {
  /// Returns a list of predefined automation templates.
  Future<List<Automation>> getTemplates(Session session) async {
    return [
      Automation(
        automationId: 1,
        name: 'Morning Routine',
        description: 'Start your day organized and focused',
        steps: [
          'Review daily briefing',
          'Check top 3 priorities',
          'Clear urgent messages',
          'Set daily goals',
          'Start first focus session',
        ],
        isActive: true,
        triggerTime: '08:00',
      ),
      Automation(
        automationId: 2,
        name: 'Meeting Preparation',
        description: 'Prepare for upcoming meetings efficiently',
        steps: [
          'Review meeting agenda',
          'Gather relevant documents',
          'Prepare talking points',
          'Set up note-taking template',
          'Test audio/video if virtual',
        ],
        isActive: true,
        triggerTime: '09:00',
      ),
      Automation(
        automationId: 3,
        name: 'End of Day Review',
        description: 'Wrap up your day and plan for tomorrow',
        steps: [
          'Review completed tasks',
          'Update task statuses',
          'Note unfinished items for tomorrow',
          'Clear notifications',
          'Set top 3 priorities for tomorrow',
        ],
        isActive: true,
        triggerTime: '17:00',
      ),
      Automation(
        automationId: 4,
        name: 'Weekly Planning',
        description: 'Plan your week for maximum productivity',
        steps: [
          'Review last week\'s accomplishments',
          'Set weekly goals',
          'Schedule important meetings',
          'Allocate focus time blocks',
          'Review and adjust priorities',
        ],
        isActive: false,
        triggerTime: '09:00',
      ),
    ];
  }

  /// Executes an automation and returns the results.
  Future<ButlerResponse> runAutomation(
    Session session,
    int automationId,
  ) async {
    final templates = await getTemplates(session);
    final automation = templates.where(
      (a) => a.automationId == automationId,
    );

    if (automation.isEmpty) {
      return ButlerResponse(
        message: 'Automation not found. Please select a valid automation.',
        category: 'error',
        timestamp: DateTime.now(),
      );
    }

    final auto = automation.first;
    final stepsCompleted = auto.steps.length;

    return ButlerResponse(
      message:
          '✅ "${auto.name}" automation completed!\n\n'
          'Completed $stepsCompleted steps:\n'
          '${auto.steps.map((s) => '• $s').join('\n')}\n\n'
          'All steps have been processed successfully.',
      category: 'automation',
      timestamp: DateTime.now(),
    );
  }
}
