import 'package:e_shop_flutter/constants/global_variables.dart';
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
        appBarTheme: const AppBarTheme(elevation: 0),
        iconTheme: IconThemeData(color: Colors.black),
        scaffoldBackgroundColor: GlobalVariables.backgroundColor,
        colorScheme: .fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("E-Shop-App")),
        body: const Center(child: Text('Flutter Demo Home Page')),
      ),
    );
  }
}
