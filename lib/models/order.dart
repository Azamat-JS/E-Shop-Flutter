// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:e_shop_flutter/models/product.dart';

class Order {
  final String id;
  final List<Product> products;
  final List<int> quantity;
  final String address;
  final String userId;
  final String orderedAt;
  final String status;
  final double totalPrice;

  Order({
    required this.id,
    required this.products,
    required this.quantity,
    required this.address,
    required this.userId,
    required this.orderedAt,
    required this.status,
    required this.totalPrice,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'products': products.map((x) => x.toMap()).toList(),
      'quantity': quantity,
      'address': address,
      'userId': userId,
      'orderedAt': orderedAt,
      'status': status,
      'totalPrice': totalPrice,
    };
  }

  factory Order.fromMap(Map<String, dynamic> map) {
    return Order(
      id: map['id']?.toString() ?? "",
      products: List<Product>.from(
        (map['products'] as List? ?? []).map<Product>(
          (x) => Product.fromMap(x as Map<String, dynamic>),
        ),
      ),
      quantity: List<int>.from(map['quantity'] as List? ?? []),
      address: map['address']?.toString() ?? "",
      userId: map['userId']?.toString() ?? "",
      orderedAt: map['orderedAt']?.toString() ?? "",
      status: map['status']?.toString() ?? "",
      totalPrice: double.parse((map['totalPrice'] ?? 0).toString()),
    );
  }

  String toJson() => json.encode(toMap());

  factory Order.fromJson(String source) =>
      Order.fromMap(json.decode(source) as Map<String, dynamic>);
}
