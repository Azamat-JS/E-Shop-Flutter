import 'package:e_shop_flutter/common/widgets/custom_textfield.dart';
import 'package:e_shop_flutter/constants/global_variables.dart';
import 'package:e_shop_flutter/constants/utils.dart';
import 'package:e_shop_flutter/features/address/services/address_services.dart';
import 'package:e_shop_flutter/providers/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:pay/pay.dart';
import 'package:provider/provider.dart';

class AddressScreen extends StatefulWidget {
  static const String routeName = '/address';
  final String totalAmount;
  const AddressScreen({super.key, required this.totalAmount});

  @override
  State<AddressScreen> createState() => _AddressScreenState();
}

class _AddressScreenState extends State<AddressScreen> {
  final _addressFormKey = GlobalKey<FormState>();
  final TextEditingController _flatBuildingController = TextEditingController();
  final TextEditingController _areaController = TextEditingController();
  final TextEditingController _pincodeController = TextEditingController();
  final TextEditingController _cityController = TextEditingController();

  List<PaymentItem> paymentItems = [];
  String addressToBeUsed = "";
  final AddressServices addressServices = AddressServices();
  PaymentConfiguration? _applePayConfig;
  PaymentConfiguration? _googlePayConfig;

  @override
  void initState() {
    super.initState();
    _loadPaymentConfig();
    _loadGooglePayConfig();
    paymentItems.add(
      PaymentItem(
        amount: widget.totalAmount,
        label: 'Total Amount',
        status: PaymentItemStatus.final_price,
      ),
    );
  }

  Future<void> _loadPaymentConfig() async {
    final jsonString = await rootBundle.loadString('assets/applepay.json');
    final config = PaymentConfiguration.fromJsonString(jsonString);
    setState(() => _applePayConfig = config);
  }

  Future<void> _loadGooglePayConfig() async {
    final jsonString = await rootBundle.loadString('assets/gpay.json');
    final config = PaymentConfiguration.fromJsonString(jsonString);
    setState(() => _googlePayConfig = config);
  }

  @override
  void dispose() {
    super.dispose();
    _flatBuildingController.dispose();
    _areaController.dispose();
    _pincodeController.dispose();
    _cityController.dispose();
  }

  void onApplePayResult(res) {
    if (Provider.of<UserProvider>(context).user.address.isEmpty) {
      addressServices.saveUserAddress(
        context: context,
        address: addressToBeUsed,
      );
    }
  }

  void onGooglePayResult(res) {}

  void payPressed(String addressFromProvider) {
    addressToBeUsed = "";

    bool isForm =
        _flatBuildingController.text.isNotEmpty ||
        _areaController.text.isNotEmpty ||
        _pincodeController.text.isNotEmpty ||
        _cityController.text.isNotEmpty;

    if (isForm) {
      if (_addressFormKey.currentState!.validate()) {
        addressToBeUsed =
            "${_flatBuildingController.text}, ${_areaController.text}, ${_cityController.text} - ${_pincodeController.text}";
      } else {
        throw Exception('Please enter all the values!');
      }
    } else if (addressFromProvider.isNotEmpty) {
      addressToBeUsed = addressFromProvider;
    } else {
      showSnackbar(context, "ERROR");
    }
  }

  @override
  Widget build(BuildContext context) {
    var address = context.watch<UserProvider>().user.address;
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(60),
        child: AppBar(
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              gradient: GlobalVariables.appBarGradient,
            ),
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              if (address.isNotEmpty)
                Column(
                  children: [
                    Container(
                      width: double.infinity,
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.black12),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(
                          address,
                          style: const TextStyle(fontSize: 18),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Text('OR', style: TextStyle(fontSize: 18)),
                    const SizedBox(height: 20),
                  ],
                ),
              Form(
                key: _addressFormKey,
                child: Column(
                  children: [
                    CustomTextfield(
                      controller: _flatBuildingController,
                      hintText: "Flat, House No, Building",
                    ),
                    const SizedBox(height: 10),
                    CustomTextfield(
                      controller: _areaController,
                      hintText: "Area, Street",
                    ),
                    const SizedBox(height: 10),
                    CustomTextfield(
                      controller: _pincodeController,
                      hintText: "Pincode",
                    ),
                    const SizedBox(height: 10),
                    CustomTextfield(
                      controller: _cityController,
                      hintText: "Town/City",
                    ),
                    const SizedBox(height: 10),
                  ],
                ),
              ),
              if (_applePayConfig != null)
                ApplePayButton(
                  width: double.infinity,
                  height: 50,
                  onPressed: () => payPressed(address),
                  margin: const EdgeInsets.only(top: 15),
                  style: ApplePayButtonStyle.whiteOutline,
                  type: ApplePayButtonType.buy,
                  paymentConfiguration: _applePayConfig!,
                  paymentItems: paymentItems,
                  onPaymentResult: onApplePayResult,
                ),
              const SizedBox(height: 10),
              if (_googlePayConfig != null)
                GooglePayButton(
                  onPressed: () => payPressed(address),
                  width: double.infinity,
                  height: 50,
                  margin: const EdgeInsets.only(top: 15),
                  type: GooglePayButtonType.buy,
                  paymentConfiguration: _googlePayConfig!,
                  paymentItems: paymentItems,
                  onPaymentResult: onGooglePayResult,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
