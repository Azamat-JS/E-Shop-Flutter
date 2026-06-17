import 'dart:convert';

class User {
  final String id;
  final String name;
  final String email;
  final String password;
  final String type;
  final String address;
  final String token;
  final List<dynamic> cart;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.password,
    required this.type,
    required this.address,
    required this.token,
    required this.cart,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'name': name,
      'email': email,
      'password': password,
      'type': type,
      'address': address,
      'token': token,
      'cart': cart,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      email: map['email'] ?? '',
      password: map['password'] ?? '',
      type: map['type'] ?? 'user',
      address: map['address'] ?? '',
      token: map['token'] ?? '',
      cart: List<Map<String, dynamic>>.from(
        (map['cart'] as List? ?? []).map((x) => Map<String, dynamic>.from(x)),
      ),
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) =>
      User.fromMap(json.decode(source) as Map<String, dynamic>);
}
