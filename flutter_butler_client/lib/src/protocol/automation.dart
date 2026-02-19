import 'package:serverpod_client/serverpod_client.dart';

/// An automation workflow template.
class Automation extends SerializableModel {
  int automationId;
  String name;
  String description;
  List<String> steps;
  bool isActive;
  String triggerTime;

  Automation({
    required this.automationId,
    required this.name,
    required this.description,
    required this.steps,
    required this.isActive,
    required this.triggerTime,
  });

  factory Automation.fromJson(
    Map<String, dynamic> json,
    SerializationManager serializationManager,
  ) {
    return Automation(
      automationId: json['automationId'] as int,
      name: json['name'] as String,
      description: json['description'] as String,
      steps: (json['steps'] as List).cast<String>(),
      isActive: json['isActive'] as bool,
      triggerTime: json['triggerTime'] as String,
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'automationId': automationId,
      'name': name,
      'description': description,
      'steps': steps,
      'isActive': isActive,
      'triggerTime': triggerTime,
    };
  }
}
