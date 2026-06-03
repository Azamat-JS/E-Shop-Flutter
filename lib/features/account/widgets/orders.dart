import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/features/account/widgets/single_product.dart';
import 'package:flutter/material.dart';

class Orders extends StatefulWidget {
  const Orders({super.key});

  @override
  State<Orders> createState() => _OrdersState();
}

class _OrdersState extends State<Orders> {
  List list = [
    "https://media.istockphoto.com/id/1454842745/photo/tourism.jpg?s=612x612&w=0&k=20&c=rK4TXVsitJExG01zRasbyJMvW9GMovCzoPTv4MsYv0M=",
    "https://images.unsplash.com/photo-1543306983-a562d8739781?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1543306983-a562d8739781?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    "https://media.istockphoto.com/id/1454842745/photo/tourism.jpg?s=612x612&w=0&k=20&c=rK4TXVsitJExG01zRasbyJMvW9GMovCzoPTv4MsYv0M=",
    "https://media.istockphoto.com/id/1454842745/photo/tourism.jpg?s=612x612&w=0&k=20&c=rK4TXVsitJExG01zRasbyJMvW9GMovCzoPTv4MsYv0M=",
  ];
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: EdgeInsets.only(left: 15),
              child: const Text(
                "Your Orders",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              ),
            ),
            Container(
              padding: EdgeInsets.only(right: 15),
              child: Text(
                "See all",
                style: TextStyle(color: GlobalVariables.selectedNavBarColor),
              ),
            ),
          ],
        ),
        Container(
          height: 170,
          padding: const EdgeInsets.only(left: 10, top: 20, right: 0),
          child: ListView.builder(
            itemCount: list.length,
            scrollDirection: Axis.horizontal,
            itemBuilder: (context, index) {
              return SingleProduct(image: list[index]);
            },
          ),
        ),
      ],
    );
  }
}
