import 'package:flutter/material.dart';

class DealOfDay extends StatefulWidget {
  const DealOfDay({super.key});

  @override
  State<DealOfDay> createState() => _DealOfDayState();
}

class _DealOfDayState extends State<DealOfDay> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          alignment: Alignment.topLeft,
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: Text('Deal of the Day', style: TextStyle(fontSize: 20)),
        ),
        Image.network(
          "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D",
          height: 240,
          fit: BoxFit.fitHeight,
        ),
      ],
    );
  }
}
