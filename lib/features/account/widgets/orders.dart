import 'package:e_shop_flutter/common/widgets/loader.dart';
import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/features/account/services/account_services.dart';
import 'package:e_shop_flutter/features/account/widgets/single_product.dart';
import 'package:e_shop_flutter/models/order.dart';
import 'package:flutter/material.dart';

class Orders extends StatefulWidget {
  const Orders({super.key});

  @override
  State<Orders> createState() => _OrdersState();
}

class _OrdersState extends State<Orders> {
  List<Order>? orders = [];
  final AccountServices accountServices = AccountServices();

  @override
  void initState() {
    super.initState();
    fetchOrders();
  }

  void fetchOrders() async {
    List<Order> fetchedOrders = await accountServices.fetchMyOrders(
      context: context,
    );
    setState(() {
      orders = fetchedOrders;
    });
  }

  @override
  Widget build(BuildContext context) {
    return orders == null
        ? const Loader()
        : Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: EdgeInsets.only(left: 15),
                    child: const Text(
                      "Your Orders",
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.only(right: 15),
                    child: Text(
                      "See all",
                      style: TextStyle(
                        color: GlobalVariables.selectedNavBarColor,
                      ),
                    ),
                  ),
                ],
              ),
              Container(
                height: 170,
                padding: const EdgeInsets.only(left: 10, top: 20, right: 0),
                child: ListView.builder(
                  itemCount: orders!.length,
                  scrollDirection: Axis.horizontal,
                  itemBuilder: (context, index) {
                    return GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(
                          context,
                          '/order-details',
                          arguments: orders![index],
                        );
                      },
                      child: SingleProduct(
                        image: orders![index].products[0].images[0],
                      ),
                    );
                  },
                ),
              ),
            ],
          );
  }
}
