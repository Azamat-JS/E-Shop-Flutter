import 'package:e_shop_flutter/common/widgets/loader.dart';
import 'package:e_shop_flutter/features/admin/models/sales.dart';
import 'package:e_shop_flutter/features/admin/services/admin_services.dart';
import 'package:flutter/material.dart';

class AnalyticsScreen extends StatefulWidget {
  const AnalyticsScreen({super.key});

  @override
  State<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen> {
  final AdminServices adminServices = AdminServices();
  int? totalSales;
  List<Sales>? earnings;
  @override
  void initState() {
    super.initState();
    getEarnings();
  }

  getEarnings() async {
    var earningsData = await adminServices.getEarnings(context);
    setState(() {
      totalSales = earningsData['totalEarnings'];
      earnings = earningsData['sales'];
    });
  }

  @override
  Widget build(BuildContext context) {
    return earnings == null || totalSales == null
        ? const Loader()
        : Column(
            children: [
              Text(
                'Total Sales: \$${totalSales.toString()}',
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          );
  }
}
