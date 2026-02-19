import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';

import 'package:flutter_butler_flutter/src/app.dart';

void main() {
  testWidgets('FlutterButlerApp renders navigation bar',
      (WidgetTester tester) async {
    await tester.pumpWidget(const FlutterButlerApp());

    expect(find.text('Home'), findsOneWidget);
    expect(find.text('Tasks'), findsOneWidget);
    expect(find.text('Butler'), findsOneWidget);
    expect(find.text('Automate'), findsOneWidget);
  });
}
