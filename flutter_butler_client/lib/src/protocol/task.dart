import 'package:serverpod_client/serverpod_client.dart';

/// A task managed by the Flutter Butler.
class Task extends SerializableModel {
  int taskId;
  String title;
  String description;
  String priority;
  String category;
  bool isCompleted;
  DateTime createdAt;

  Task({
    required this.taskId,
    required this.title,
    required this.description,
    required this.priority,
    required this.category,
    required this.isCompleted,
    required this.createdAt,
  });

  factory Task.fromJson(
    Map<String, dynamic> json,
    SerializationManager serializationManager,
  ) {
    return Task(
      taskId: json['taskId'] as int,
      title: json['title'] as String,
      description: json['description'] as String,
      priority: json['priority'] as String,
      category: json['category'] as String,
      isCompleted: json['isCompleted'] as bool,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'taskId': taskId,
      'title': title,
      'description': description,
      'priority': priority,
      'category': category,
      'isCompleted': isCompleted,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
