import 'package:dio/dio.dart';
import 'package:e_shop_flutter/common/network/dio_client.dart';
import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/constants/utils.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CartServices {
  Future<void> removeFromCart({
    required BuildContext context,
    required String productId,
    required String userId,
  }) async {
    try {
      final dio = DioClient.dio;
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('x-auth-token') ?? '';

      await dio.delete(
        '${ApiConfig.baseUrl}/cart/remove-from-cart/$productId/$userId',
        options: Options(headers: {'x-auth-token': token}),
      );
    } catch (e) {
      showSnackbar(context, e.toString());
      rethrow;
    }
  }
}
