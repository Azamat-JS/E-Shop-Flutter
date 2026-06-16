import 'package:dio/dio.dart';
import 'package:e_shop_flutter/common/network/dio_client.dart';
import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/constants/utils.dart';
import 'package:e_shop_flutter/models/product.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeServices {
  Future<List<Product>> fetchCategoryProducts({
    required BuildContext context,
    required String category,
  }) async {
    final dio = DioClient.dio;
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('x-auth-token') ?? '';

    try {
      final res = await dio.get(
        '${ApiConfig.baseUrl}/product/get-by-category?category=${Uri.encodeComponent(category)}',
        options: Options(headers: {'x-auth-token': token}),
      );

      final data = res.data as List;

      return data.map((e) => Product.fromMap(e)).toList();
    } catch (e) {
      showSnackbar(context, e.toString());
      return [];
    }
  }

  Future<Product> fetchDealOfDay({required BuildContext context}) async {
    final dio = DioClient.dio;
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('x-auth-token') ?? '';

    try {
      final res = await dio.get(
        '${ApiConfig.baseUrl}/product/deal-of-day',
        options: Options(headers: {'x-auth-token': token}),
      );

      final data = res.data;

      return Product.fromMap(data);
    } catch (e) {
      showSnackbar(context, e.toString());
      rethrow;
    }
  }
}
