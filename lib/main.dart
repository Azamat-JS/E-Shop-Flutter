import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/features/auth/screens/auth_screen.dart';
import 'package:e_shop_flutter/route.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'E-Shop',
      theme: ThemeData(
        useMaterial3: false,
        appBarTheme: const AppBarTheme(elevation: 0),
        iconTheme: IconThemeData(color: Colors.black),
        scaffoldBackgroundColor: GlobalVariables.backgroundColor,
        colorScheme: const ColorScheme.light(
          primary: GlobalVariables.secondaryColor,
        ),
      ),
      onGenerateRoute: (settings) => generateRoute(settings),
      home: const AuthScreen(),
    );
  }
}
