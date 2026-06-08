import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:e_shop_flutter/common/network/dio_client.dart';
import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/constants/utils.dart';
import 'package:e_shop_flutter/models/product.dart';
import 'package:e_shop_flutter/providers/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:http_parser/http_parser.dart';
import 'package:path/path.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mime/mime.dart';

class AdminServices {
  Future<void> sellProduct({
    required BuildContext context,
    required String name,
    required String description,
    required double price,
    required double quantity,
    required String category,
    required List<File> images,
  }) async {
    try {
      final dio = DioClient.dio;
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String token = prefs.getString('x-auth-token') ?? '';

      List<String> imageUrls = [];

      for (File image in images) {
        final authResponse = await dio.get(
          '${ApiConfig.baseUrl}/auth/imagekit',
          options: Options(headers: {'x-auth-token': token}),
        );
        final authData = authResponse.data;

        String fileName = basename(image.path);
        final mimeType = lookupMimeType(image.path)?.split('/');

        if (mimeType == null) {
          throw Exception("Could not determine image MIME type");
        }

        FormData formData = FormData.fromMap({
          "file": await MultipartFile.fromFile(
            image.path,
            filename: fileName,
            contentType: MediaType(mimeType[0], mimeType[1]),
          ),
          "fileName": fileName,
          "publicKey": "public_HbPMNQcILi9g+afGPl4eIwPLISs=",
          "signature": authData["signature"],
          "expire": authData["expire"].toString(),
          "token": authData["token"],
        });

        final uploadResponse = await dio.post(
          "https://upload.imagekit.io/api/v1/files/upload",
          data: formData,
        );

        imageUrls.add(uploadResponse.data["url"]);
      }

      Product product = Product(
        name: name,
        description: description,
        quantity: quantity,
        images: imageUrls,
        category: category,
        price: price,
      );

      await dio.post(
        '${ApiConfig.baseUrl}/product/add-product',
        data: product.toMap(),
        options: Options(headers: {'x-auth-token': token}),
      );

      showSnackbar(context, "Product added successfully");
    } on DioException catch (e) {
      showSnackbar(
        context,
        e.response?.data.toString() ?? e.message.toString(),
      );
    } catch (e) {
      showSnackbar(context, e.toString());
    }
  }

  Future<List<Product>> fetchAllProducts(BuildContext context) async {
    final dio = DioClient.dio;
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('x-auth-token') ?? '';

    try {
      final res = await dio.get(
        '${ApiConfig.baseUrl}/product/get-all',
        options: Options(headers: {'x-auth-token': token}),
      );

      final data = res.data as List;

      return data.map((e) => Product.fromMap(e)).toList();
    } catch (e) {
      showSnackbar(context, e.toString());
      return [];
    }
  }
}
