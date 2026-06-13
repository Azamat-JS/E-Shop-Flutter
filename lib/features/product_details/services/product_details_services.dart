import 'package:dio/dio.dart';
import 'package:e_shop_flutter/common/network/dio_client.dart';
import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/constants/utils.dart';
import 'package:e_shop_flutter/models/product.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProductDetailsServices {
  Future<Product> rateProduct({
    required BuildContext context,
    required Product product,
    required double rating,
  }) async {
    try {
      final dio = DioClient.dio;
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('x-auth-token') ?? '';

      final response = await dio.post(
        '${ApiConfig.baseUrl}/product/rate-product/${product.id}',
        data: {'rating': rating},
        options: Options(headers: {'x-auth-token': token}),
      );

      return Product.fromMap(response.data);
    } catch (e) {
      showSnackbar(context, e.toString());
      rethrow;
    }
  }
}
