import 'package:dio/dio.dart';
import 'package:e_shop_flutter/common/network/dio_client.dart';
import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/constants/utils.dart';
import 'package:e_shop_flutter/models/product.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AddressServices {
  Future<void> saveUserAddress({
    required BuildContext context,
    required String address,
  }) async {
    try {
      final dio = DioClient.dio;
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String token = prefs.getString('x-auth-token') ?? '';

      await dio.post(
        '${ApiConfig.baseUrl}/auth/user-address',
        data: {"address": address},
        options: Options(headers: {'x-auth-token': token}),
      );
    } on DioException catch (e) {
      showSnackbar(
        context,
        e.response?.data.toString() ?? e.message.toString(),
      );
    } catch (e) {
      showSnackbar(context, e.toString());
    }
  }

  Future<void> placeOrder({
    required BuildContext context,
    required String address,
    required double totalSum,
    required List<dynamic> cart,
  }) async {
    final dio = DioClient.dio;
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('x-auth-token') ?? '';

    try {
      final products = cart.map((item) {
        final cartProduct = item['product'] as Map<String, dynamic>;
        final id = (cartProduct['_id'] ?? cartProduct['id']).toString();
        return {'id': id, 'quantity': item['quantity']};
      }).toList();

      await dio.post(
        '${ApiConfig.baseUrl}/product/order',
        data: {
          'products': products,
          'totalPrice': totalSum,
          'address': address,
        },
        options: Options(headers: {'x-auth-token': token}),
      );
      showSnackbar(context, 'Order is placed successfully!');
    } on DioException catch (e) {
      if (context.mounted) {
        showSnackbar(
          context,
          e.response?.data.toString() ?? e.message.toString(),
        );
      }
    } catch (e) {
      if (context.mounted) showSnackbar(context, e.toString());
    }
  }

  void deleteProduct({
    required BuildContext context,
    required Product product,
    required VoidCallback onSuccess,
  }) async {
    try {
      final dio = DioClient.dio;

      final prefs = await SharedPreferences.getInstance();

      final token = prefs.getString('x-auth-token') ?? '';

      final res = await dio.delete(
        '${ApiConfig.baseUrl}/product/delete/${product.id}',
        options: Options(headers: {'x-auth-token': token}),
      );

      showSnackbar(context, res.data['message']);

      onSuccess();
    } catch (e) {
      showSnackbar(context, e.toString());
    }
  }
}
