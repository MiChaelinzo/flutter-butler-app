import 'package:flutter/material.dart';

/// Screen for managing automation templates and daily routines.
class AutomationsScreen extends StatefulWidget {
  const AutomationsScreen({super.key});

  @override
  State<AutomationsScreen> createState() => _AutomationsScreenState();
}

class _AutomationItem {
  final int id;
  final String name;
  final String description;
  final List<String> steps;
  final String triggerTime;
  final IconData icon;
  bool isActive;

  _AutomationItem({
    required this.id,
    required this.name,
    required this.description,
    required this.steps,
    required this.triggerTime,
    required this.icon,
    this.isActive = true,
  });
}

class _AutomationsScreenState extends State<AutomationsScreen> {
  final List<_AutomationItem> _automations = [
    _AutomationItem(
      id: 1,
      name: 'Morning Routine',
      description: 'Start your day organized and focused',
      steps: [
        'Review daily briefing',
        'Check top 3 priorities',
        'Clear urgent messages',
        'Set daily goals',
        'Start first focus session',
      ],
      triggerTime: '08:00',
      icon: Icons.wb_sunny_outlined,
    ),
    _AutomationItem(
      id: 2,
      name: 'Meeting Preparation',
      description: 'Prepare for upcoming meetings efficiently',
      steps: [
        'Review meeting agenda',
        'Gather relevant documents',
        'Prepare talking points',
        'Set up note-taking template',
        'Test audio/video if virtual',
      ],
      triggerTime: '09:00',
      icon: Icons.groups_outlined,
    ),
    _AutomationItem(
      id: 3,
      name: 'End of Day Review',
      description: 'Wrap up your day and plan for tomorrow',
      steps: [
        'Review completed tasks',
        'Update task statuses',
        'Note unfinished items for tomorrow',
        'Clear notifications',
        'Set top 3 priorities for tomorrow',
      ],
      triggerTime: '17:00',
      icon: Icons.nightlight_outlined,
    ),
    _AutomationItem(
      id: 4,
      name: 'Weekly Planning',
      description: 'Plan your week for maximum productivity',
      steps: [
        'Review last week\'s accomplishments',
        'Set weekly goals',
        'Schedule important meetings',
        'Allocate focus time blocks',
        'Review and adjust priorities',
      ],
      triggerTime: '09:00',
      icon: Icons.calendar_month_outlined,
      isActive: false,
    ),
  ];

  void _runAutomation(_AutomationItem automation) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(automation.icon),
            const SizedBox(width: 8),
            Expanded(child: Text(automation.name)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Running automation...',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 16),
            ...automation.steps.map(
              (step) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Row(
                  children: [
                    const Icon(Icons.check_circle, color: Colors.green, size: 20),
                    const SizedBox(width: 8),
                    Expanded(child: Text(step)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              '✅ All steps completed!',
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    color: Colors.green,
                    fontWeight: FontWeight.bold,
                  ),
            ),
          ],
        ),
        actions: [
          FilledButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Done'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Automations'),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Header
          Card(
            color: theme.colorScheme.primaryContainer,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Icon(
                    Icons.auto_awesome,
                    color: theme.colorScheme.primary,
                    size: 32,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Automation Studio',
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          'Automate your daily routines with pre-built workflows',
                          style: theme.textTheme.bodySmall,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 16),

          Text(
            'Workflow Templates',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),

          // Automation cards
          ..._automations.map((automation) => Card(
                child: ExpansionTile(
                  leading: CircleAvatar(
                    backgroundColor: automation.isActive
                        ? theme.colorScheme.primaryContainer
                        : theme.colorScheme.surfaceContainerHighest,
                    child: Icon(automation.icon),
                  ),
                  title: Text(automation.name),
                  subtitle: Row(
                    children: [
                      Icon(Icons.schedule, size: 14,
                          color: theme.colorScheme.onSurfaceVariant),
                      const SizedBox(width: 4),
                      Text(
                        automation.triggerTime,
                        style: theme.textTheme.bodySmall,
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 2,
                        ),
                        decoration: BoxDecoration(
                          color: automation.isActive
                              ? Colors.green.withOpacity(0.15)
                              : Colors.grey.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          automation.isActive ? 'Active' : 'Inactive',
                          style: TextStyle(
                            fontSize: 11,
                            color: automation.isActive
                                ? Colors.green
                                : Colors.grey,
                          ),
                        ),
                      ),
                    ],
                  ),
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            automation.description,
                            style: theme.textTheme.bodyMedium,
                          ),
                          const SizedBox(height: 12),
                          Text(
                            'Steps:',
                            style: theme.textTheme.labelLarge,
                          ),
                          const SizedBox(height: 4),
                          ...automation.steps.asMap().entries.map(
                            (entry) => Padding(
                              padding:
                                  const EdgeInsets.only(bottom: 4),
                              child: Row(
                                children: [
                                  CircleAvatar(
                                    radius: 10,
                                    child: Text(
                                      '${entry.key + 1}',
                                      style:
                                          const TextStyle(fontSize: 10),
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Text(entry.value),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 12),
                          Row(
                            children: [
                              FilledButton.icon(
                                onPressed: () =>
                                    _runAutomation(automation),
                                icon: const Icon(Icons.play_arrow),
                                label: const Text('Run Now'),
                              ),
                              const SizedBox(width: 8),
                              OutlinedButton(
                                onPressed: () {
                                  setState(() {
                                    automation.isActive =
                                        !automation.isActive;
                                  });
                                },
                                child: Text(automation.isActive
                                    ? 'Disable'
                                    : 'Enable'),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }
}
