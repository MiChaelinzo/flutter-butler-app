import 'package:serverpod_client/serverpod_client.dart';

import 'protocol.dart';

/// The main client class for communicating with the Flutter Butler server.
/// 
/// After running `serverpod generate`, this class will be auto-generated
/// with type-safe method calls for each endpoint.
class Client extends ServerpodClientShared {
  Client(
    String host, {
    dynamic securityContext,
    ServerpodClientSharedAuthenticationKeyManager? authenticationKeyManager,
    Duration? streamingConnectionTimeout,
    Duration? connectionTimeout,
    void Function(
      MethodCallContext context,
      Object error,
      StackTrace stackTrace,
    )? onFailedCall,
    void Function(
      MethodCallContext context,
      Object error,
      StackTrace stackTrace,
    )? onSucceededCall,
  }) : super(
          host,
          Protocol(),
          securityContext: securityContext,
          authenticationKeyManager: authenticationKeyManager,
          streamingConnectionTimeout: streamingConnectionTimeout,
          connectionTimeout: connectionTimeout,
          onFailedCall: onFailedCall,
          onSucceededCall: onSucceededCall,
        );
}
