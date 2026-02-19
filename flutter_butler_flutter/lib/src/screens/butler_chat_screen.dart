import 'package:flutter/material.dart';

/// Chat screen for interacting with the Flutter Butler AI assistant.
class ButlerChatScreen extends StatefulWidget {
  const ButlerChatScreen({super.key});

  @override
  State<ButlerChatScreen> createState() => _ButlerChatScreenState();
}

class _ChatMessage {
  final String text;
  final bool isUser;
  final DateTime timestamp;

  _ChatMessage({
    required this.text,
    required this.isUser,
    DateTime? timestamp,
  }) : timestamp = timestamp ?? DateTime.now();
}

class _ButlerChatScreenState extends State<ButlerChatScreen> {
  final List<_ChatMessage> _messages = [
    _ChatMessage(
      text: 'Hello! I\'m your Flutter Butler 🤖\n\n'
          'I can help you with:\n'
          '• Task management and prioritization\n'
          '• Daily briefings and productivity insights\n'
          '• Automating daily routines\n'
          '• Quick actions like drafting emails\n\n'
          'How can I assist you today?',
      isUser: false,
    ),
  ];
  final _textController = TextEditingController();
  final _scrollController = ScrollController();
  bool _isTyping = false;

  void _sendMessage() async {
    final text = _textController.text.trim();
    if (text.isEmpty) return;

    setState(() {
      _messages.add(_ChatMessage(text: text, isUser: true));
      _isTyping = true;
    });
    _textController.clear();
    _scrollToBottom();

    // Simulate butler response (replace with Serverpod call when server runs)
    await Future.delayed(const Duration(milliseconds: 800));

    String reply;
    final lower = text.toLowerCase();
    if (lower.contains('task') || lower.contains('todo')) {
      reply = 'I can help you manage your tasks! Go to the Tasks tab to add, '
          'complete, or organize your to-do list. Would you like suggestions '
          'on what to tackle first?';
    } else if (lower.contains('automate') || lower.contains('routine')) {
      reply = 'Check out the Automate tab for workflow templates! I have '
          'morning routines, meeting prep, and end-of-day reviews ready for you.';
    } else if (lower.contains('hello') ||
        lower.contains('hi') ||
        lower.contains('hey')) {
      reply = 'Hey there! Ready to help you be more productive. '
          'What would you like to work on?';
    } else if (lower.contains('help')) {
      reply = 'Here\'s what I can do:\n\n'
          '📋 Manage tasks and priorities\n'
          '📊 Generate daily briefings\n'
          '⚡ Run automation workflows\n'
          '✉️ Draft emails and meeting prep\n'
          '🎯 Track your daily goals\n\n'
          'Just ask me anything!';
    } else {
      reply = 'That\'s interesting! I\'m processing your request about '
          '"$text". Is there something specific I can help you with regarding '
          'your tasks, schedule, or automations?';
    }

    setState(() {
      _isTyping = false;
      _messages.add(_ChatMessage(text: reply, isUser: false));
    });
    _scrollToBottom();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _textController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.smart_toy),
            SizedBox(width: 8),
            Text('Flutter Butler'),
          ],
        ),
        centerTitle: true,
      ),
      body: Column(
        children: [
          // Messages list
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length + (_isTyping ? 1 : 0),
              itemBuilder: (context, index) {
                if (index == _messages.length && _isTyping) {
                  return _buildTypingIndicator(theme);
                }
                return _buildMessageBubble(_messages[index], theme);
              },
            ),
          ),

          // Suggestion chips
          SizedBox(
            height: 44,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                _SuggestionChip(
                  label: 'What can you do?',
                  onTap: () {
                    _textController.text = 'What can you help me with?';
                    _sendMessage();
                  },
                ),
                _SuggestionChip(
                  label: 'My tasks',
                  onTap: () {
                    _textController.text = 'Show me my tasks';
                    _sendMessage();
                  },
                ),
                _SuggestionChip(
                  label: 'Start routine',
                  onTap: () {
                    _textController.text = 'Start my morning routine';
                    _sendMessage();
                  },
                ),
              ],
            ),
          ),

          const SizedBox(height: 8),

          // Input bar
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _textController,
                    decoration: InputDecoration(
                      hintText: 'Ask your butler...',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 12,
                      ),
                    ),
                    onSubmitted: (_) => _sendMessage(),
                  ),
                ),
                const SizedBox(width: 8),
                FloatingActionButton.small(
                  onPressed: _sendMessage,
                  child: const Icon(Icons.send),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessageBubble(_ChatMessage message, ThemeData theme) {
    return Align(
      alignment:
          message.isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.75,
        ),
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: message.isUser
              ? theme.colorScheme.primaryContainer
              : theme.colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(16),
            topRight: const Radius.circular(16),
            bottomLeft: Radius.circular(message.isUser ? 16 : 4),
            bottomRight: Radius.circular(message.isUser ? 4 : 16),
          ),
        ),
        child: Text(
          message.text,
          style: theme.textTheme.bodyMedium,
        ),
      ),
    );
  }

  Widget _buildTypingIndicator(ThemeData theme) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: theme.colorScheme.surfaceContainerHighest,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(16),
            topRight: Radius.circular(16),
            bottomRight: Radius.circular(16),
            bottomLeft: Radius.circular(4),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: 16,
              height: 16,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
            const SizedBox(width: 8),
            Text(
              'Butler is thinking...',
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SuggestionChip extends StatelessWidget {
  final String label;
  final VoidCallback onTap;

  const _SuggestionChip({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ActionChip(
        label: Text(label),
        onPressed: onTap,
      ),
    );
  }
}
