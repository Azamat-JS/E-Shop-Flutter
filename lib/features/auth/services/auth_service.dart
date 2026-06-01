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

      http.Response res = await http.post(
        Uri.parse('${ApiConfig.baseUrl}/auth/register'),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      print(res.body);
    } catch (e) {}
  }
}
