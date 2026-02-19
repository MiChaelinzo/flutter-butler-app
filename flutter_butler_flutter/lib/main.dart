import 'package:flutter/material.dart';
import 'package:flutter_butler_client/flutter_butler_client.dart';
import 'package:serverpod_flutter/serverpod_flutter.dart';

import 'src/app.dart';

/// Global client for communicating with the Flutter Butler Serverpod backend.
late final Client client;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final serverUrl = await getServerUrl();

  client = Client(serverUrl)
    ..connectivityMonitor = FlutterConnectivityMonitor();

  runApp(const FlutterButlerApp());
}
