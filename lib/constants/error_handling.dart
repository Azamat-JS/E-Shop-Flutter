import 'dart:convert';

import 'package:e_shop_flutter/constants/utils.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void httpErrorHandle({
  required http.Response response,
  required BuildContext context,
  required VoidCallback onSuccess,
}) {
  switch (response.statusCode) {
    case 200:
    case 201:
      onSuccess();
      break;
    case 400:
      final msg400 = jsonDecode(response.body)['message'];
      showSnackbar(context, msg400 is List ? msg400.join(', ') : msg400.toString());
      break;
    case 500:
      final msg500 = jsonDecode(response.body)['message'];
      showSnackbar(context, msg500 is List ? (msg500 as List).join(', ') : msg500.toString());
      break;
    default:
      showSnackbar(context, response.body);
  }
}
