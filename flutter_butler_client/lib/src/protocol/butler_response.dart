import 'package:serverpod_client/serverpod_client.dart';

/// A response from the Flutter Butler assistant.
class ButlerResponse extends SerializableModel {
  String message;
  String category;
  DateTime timestamp;

  ButlerResponse({
    required this.message,
    required this.category,
    required this.timestamp,
  });

  factory ButlerResponse.fromJson(
    Map<String, dynamic> json,
    SerializationManager serializationManager,
  ) {
    return ButlerResponse(
      message: json['message'] as String,
      category: json['category'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'message': message,
      'category': category,
      'timestamp': timestamp.toIso8601String(),
    };
  }
}
