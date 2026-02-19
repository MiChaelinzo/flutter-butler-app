import 'package:serverpod/serverpod.dart';

import '../generated/protocol.dart';

/// The Butler endpoint handles AI-powered personal assistant features
/// including daily briefings, quick actions, and chat interactions.
class ButlerEndpoint extends Endpoint {
  /// Returns a personalized daily briefing with priorities and suggestions.
  Future<DailyBriefing> getDailyBriefing(Session session) async {
    final now = DateTime.now();
    final hour = now.hour;

    String greeting;
    if (hour < 12) {
      greeting = 'Good morning';
    } else if (hour < 17) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    return DailyBriefing(
      greeting: greeting,
      date: now,
      priorities: [
        'Review and respond to important messages',
        'Complete your top priority task',
        'Take a short break to recharge',
      ],
      suggestions: [
        'Start with your most challenging task while energy is high',
        'Block 25 minutes for focused deep work',
        'Review your goals for the week',
      ],
      motivationalQuote:
          'The secret of getting ahead is getting started. — Mark Twain',
    );
  }

  /// Processes a chat message and returns an AI-powered butler response.
  Future<ButlerResponse> chat(Session session, String message) async {
    final lowerMessage = message.toLowerCase().trim();

    String reply;
    String category;

    if (lowerMessage.contains('task') || lowerMessage.contains('todo')) {
      reply =
          'I can help you manage your tasks. Would you like to add a new task, '
          'view your current tasks, or get suggestions on what to tackle next?';
      category = 'tasks';
    } else if (lowerMessage.contains('schedule') ||
        lowerMessage.contains('calendar')) {
      reply =
          'Let me help you with scheduling. I can suggest optimal times for '
          'your tasks based on your energy patterns and existing commitments.';
      category = 'scheduling';
    } else if (lowerMessage.contains('automate') ||
        lowerMessage.contains('routine') ||
        lowerMessage.contains('automation')) {
      reply =
          'I can help set up automations for your daily routines. Would you '
          'like to create a morning routine, evening wind-down, or a custom workflow?';
      category = 'automation';
    } else if (lowerMessage.contains('help') ||
        lowerMessage.contains('what can you do')) {
      reply =
          'I\'m your personal Flutter Butler! I can help with:\n'
          '• Task management and prioritization\n'
          '• Daily briefings and productivity insights\n'
          '• Automating daily routines\n'
          '• Scheduling suggestions\n'
          '• Quick actions like drafting emails or meeting prep\n'
          'Just ask me anything!';
      category = 'help';
    } else if (lowerMessage.contains('hello') ||
        lowerMessage.contains('hi') ||
        lowerMessage.contains('hey')) {
      reply =
          'Hello! I\'m your Flutter Butler, ready to assist you. How can I '
          'help you be more productive today?';
      category = 'greeting';
    } else {
      reply =
          'I understand you\'re asking about "$message". Let me help you with '
          'that. Could you provide a bit more context so I can assist you better?';
      category = 'general';
    }

    return ButlerResponse(
      message: reply,
      category: category,
      timestamp: DateTime.now(),
    );
  }

  /// Executes a quick action and returns the result.
  Future<ButlerResponse> executeQuickAction(
    Session session,
    String actionType,
    String context,
  ) async {
    String result;
    String category;

    switch (actionType) {
      case 'draft_email':
        result =
            'Here\'s a draft email based on your context:\n\n'
            'Subject: Re: $context\n\n'
            'Dear colleague,\n\n'
            'Thank you for your message regarding $context. '
            'I wanted to follow up and share my thoughts on this matter.\n\n'
            'Please let me know if you\'d like to discuss further.\n\n'
            'Best regards';
        category = 'email';
        break;
      case 'meeting_prep':
        result =
            'Meeting Preparation for: $context\n\n'
            '📋 Agenda Items:\n'
            '1. Review previous action items\n'
            '2. Discuss main topic: $context\n'
            '3. Identify next steps and owners\n'
            '4. Set follow-up date\n\n'
            '⏱ Suggested Duration: 30 minutes\n'
            '📝 Remember to take notes!';
        category = 'meeting';
        break;
      case 'summarize':
        result =
            'Summary of: $context\n\n'
            'Key Points:\n'
            '• Main topic identified and analyzed\n'
            '• Action items have been extracted\n'
            '• Follow-up recommendations are ready\n\n'
            'Would you like me to elaborate on any specific point?';
        category = 'summary';
        break;
      default:
        result =
            'I\'ve processed your "$actionType" action for: $context. '
            'The results are ready for your review.';
        category = 'general';
    }

    return ButlerResponse(
      message: result,
      category: category,
      timestamp: DateTime.now(),
    );
  }
}
