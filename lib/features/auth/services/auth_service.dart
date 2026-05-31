import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/models/user.dart';
import 'package:http/http.dart' as http;

class AuthService {
  void signUpUser({
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

      http.post(Uri.parse('${ApiConfig.baseUrl}/auth/register'));
    } catch (e) {}
  }
}
