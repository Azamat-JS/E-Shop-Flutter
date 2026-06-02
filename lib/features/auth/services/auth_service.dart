import 'dart:convert';

import 'package:e_shop_flutter/constants/error_handling.dart';
import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/constants/utils.dart';
import 'package:e_shop_flutter/features/home/screens/home_screen.dart';
import 'package:e_shop_flutter/models/user.dart';
import 'package:e_shop_flutter/providers/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  void signUpUser({
    required BuildContext context,
    required String email,
    required String password,
    required String name,
  }) async {
    try {
      User user = User(
        id: "",
        name: name,
        password: password,
        email: email,
        address: "",
        token: "",
        type: "",
      );

      http.Response res = await http.post(
        Uri.parse('${ApiConfig.baseUrl}/auth/register'),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          showSnackbar(
            context,
            "Account created! Login with the same credentials.",
          );
        },
      );
    } catch (e) {
      showSnackbar(context, e.toString());
    }
  }

  void loginUser({
    required BuildContext context,
    required String email,
    required String password,
  }) async {
    try {
      http.Response res = await http.post(
        Uri.parse('${ApiConfig.baseUrl}/auth/login'),
        body: jsonEncode({"email": email, "password": password}),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () async {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          Provider.of<UserProvider>(context, listen: false).setUser(res.body);
          await prefs.setString('x-auth-token', jsonDecode(res.body)['token']);
          showSnackbar(context, "Login successful!");
          Navigator.pushNamedAndRemoveUntil(
            context,
            HomeScreen.routeName,
            (route) => false,
          );
        },
      );
    } catch (e) {
      showSnackbar(context, e.toString());
    }
  }

  void getUserData(BuildContext context) async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();

      String? token = prefs.getString('x-auth-token');

      if (token == null) {
        prefs.setString('x-auth-token', '');
      }
      // http.Response res = await http.post(
      //   Uri.parse('${ApiConfig.baseUrl}/auth/login'),
      //   body: jsonEncode({"email": email, "password": password}),
      //   headers: <String, String>{
      //     'Content-Type': 'application/json; charset=UTF-8',
      //   },
      // );

      // httpErrorHandle(
      //   response: res,
      //   context: context,
      //   onSuccess: () async {
      //     SharedPreferences prefs = await SharedPreferences.getInstance();
      //     Provider.of<UserProvider>(context, listen: false).setUser(res.body);
      //     await prefs.setString('x-auth-token', jsonDecode(res.body)['token']);
      //     showSnackbar(context, "Login successful!");
      //     Navigator.pushNamedAndRemoveUntil(
      //       context,
      //       HomeScreen.routeName,
      //       (route) => false,
      //     );
      //   },
      // );
    } catch (e) {
      showSnackbar(context, e.toString());
    }
  }
}
