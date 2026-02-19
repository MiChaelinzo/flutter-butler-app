import 'package:flutter/material.dart';

/// Home screen displaying the daily briefing and quick actions dashboard.
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _isLoading = false;
  String _greeting = '';
  List<String> _priorities = [];
  List<String> _suggestions = [];
  String _quote = '';

  @override
  void initState() {
    super.initState();
    _loadBriefing();
  }

  Future<void> _loadBriefing() async {
    setState(() => _isLoading = true);

    // Simulate briefing data (replace with Serverpod call when server is running)
    await Future.delayed(const Duration(milliseconds: 500));

    final hour = DateTime.now().hour;
    setState(() {
      _isLoading = false;
      _greeting = hour < 12
          ? 'Good morning'
          : hour < 17
              ? 'Good afternoon'
              : 'Good evening';
      _priorities = [
        'Review and respond to important messages',
        'Complete your top priority task',
        'Take a short break to recharge',
      ];
      _suggestions = [
        'Start with your most challenging task while energy is high',
        'Block 25 minutes for focused deep work',
        'Review your goals for the week',
      ];
      _quote =
          'The secret of getting ahead is getting started. — Mark Twain';
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter Butler'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadBriefing,
            tooltip: 'Refresh briefing',
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _loadBriefing,
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  // Greeting Card
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.wb_sunny,
                                  color: theme.colorScheme.primary, size: 28),
                              const SizedBox(width: 12),
                              Text(
                                '$_greeting!',
                                style: theme.textTheme.headlineSmall?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Here\'s your daily briefing',
                            style: theme.textTheme.bodyLarge?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Quick Actions
                  Text(
                    'Quick Actions',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    height: 100,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      children: [
                        _QuickActionChip(
                          icon: Icons.email_outlined,
                          label: 'Draft Email',
                          color: theme.colorScheme.primaryContainer,
                          onTap: () => _showQuickAction(context, 'Draft Email'),
                        ),
                        _QuickActionChip(
                          icon: Icons.groups_outlined,
                          label: 'Meeting Prep',
                          color: theme.colorScheme.secondaryContainer,
                          onTap: () =>
                              _showQuickAction(context, 'Meeting Prep'),
                        ),
                        _QuickActionChip(
                          icon: Icons.summarize_outlined,
                          label: 'Summarize',
                          color: theme.colorScheme.tertiaryContainer,
                          onTap: () => _showQuickAction(context, 'Summarize'),
                        ),
                        _QuickActionChip(
                          icon: Icons.timer_outlined,
                          label: 'Focus Timer',
                          color: theme.colorScheme.errorContainer,
                          onTap: () =>
                              _showQuickAction(context, 'Focus Timer'),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Priorities
                  Text(
                    'Today\'s Priorities',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ...List.generate(
                    _priorities.length,
                    (index) => Card(
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor:
                              theme.colorScheme.primaryContainer,
                          child: Text('${index + 1}'),
                        ),
                        title: Text(_priorities[index]),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Suggestions
                  Text(
                    'Smart Suggestions',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ...List.generate(
                    _suggestions.length,
                    (index) => Card(
                      child: ListTile(
                        leading: Icon(
                          Icons.lightbulb_outline,
                          color: theme.colorScheme.tertiary,
                        ),
                        title: Text(_suggestions[index]),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Motivational Quote
                  Card(
                    color: theme.colorScheme.primaryContainer,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          Icon(Icons.format_quote,
                              color: theme.colorScheme.primary),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              _quote,
                              style: theme.textTheme.bodyMedium?.copyWith(
                                fontStyle: FontStyle.italic,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }

  void _showQuickAction(BuildContext context, String action) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('$action action triggered!')),
    );
  }
}

class _QuickActionChip extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;

  const _QuickActionChip({
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          width: 100,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(16),
          ),
          padding: const EdgeInsets.all(12),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 28),
              const SizedBox(height: 8),
              Text(
                label,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.labelSmall,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
