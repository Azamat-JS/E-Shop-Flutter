import 'package:dotted_border/dotted_border.dart';
import 'package:e_shop_flutter/common/widgets/custom_button.dart';
import 'package:e_shop_flutter/common/widgets/custom_textfield.dart';
import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:flutter/material.dart';

class AddProductScreen extends StatefulWidget {
  static const String routeName = '/add-product';
  const AddProductScreen({super.key});

  @override
  State<AddProductScreen> createState() => _AddProductScreenState();
}

class _AddProductScreenState extends State<AddProductScreen> {
  final TextEditingController productNameController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController priceController = TextEditingController();
  final TextEditingController quantityController = TextEditingController();

  String category = 'Mobiles';

  @override
  void dispose() {
    super.dispose();
    productNameController.dispose();
    descriptionController.dispose();
    priceController.dispose();
    quantityController.dispose();
  }

  List<String> productCategories = [
    'Mobiles',
    'Essentials',
    'Appliances',
    'Books',
    'Fashion',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(50),
        child: AppBar(
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              gradient: GlobalVariables.appBarGradient,
            ),
          ),
          title: const Text(
            'Add Product',
            style: TextStyle(color: Colors.black),
          ),
        ),
      ),

      body: SingleChildScrollView(
        child: Form(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: Column(
              children: [
                const SizedBox(height: 20),
                DottedBorder(
                  options: RoundedRectDottedBorderOptions(
                    dashPattern: [10, 5],
                    strokeWidth: 2,
                    radius: Radius.circular(16),
                    color: Colors.indigo,
                    padding: EdgeInsets.all(16),
                  ),
                  child: Container(
                    width: double.infinity,
                    height: 150,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.folder_open, size: 40),
                        const SizedBox(height: 10),
                        Text(
                          'Select Product Images',
                          style: TextStyle(
                            fontSize: 15,
                            color: Colors.grey.shade400,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 30),
                CustomTextfield(
                  hintText: 'Product Name',
                  controller: productNameController,
                ),
                SizedBox(height: 10),
                CustomTextfield(
                  hintText: 'Description',
                  maxLines: 7,
                  controller: descriptionController,
                ),
                SizedBox(height: 10),
                CustomTextfield(hintText: 'Price', controller: priceController),
                SizedBox(height: 10),
                CustomTextfield(
                  hintText: 'Quantity',
                  controller: quantityController,
                ),
                SizedBox(
                  width: double.infinity,
                  child: DropdownButton(
                    value: category,
                    icon: Icon(Icons.keyboard_arrow_down),
                    items: productCategories.map((String item) {
                      return DropdownMenuItem(value: item, child: Text(item));
                    }).toList(),
                    onChanged: (String? newVal) {
                      setState(() {
                        category = newVal!;
                      });
                    },
                  ),
                ),
                SizedBox(height: 10),
                CustomButton(text: 'Sell', onTap: () {}),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
