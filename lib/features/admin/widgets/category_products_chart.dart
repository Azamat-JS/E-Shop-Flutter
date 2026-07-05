import "dart:math";

import "package:e_shop_flutter/features/admin/models/sales.dart";
import "package:fl_chart/fl_chart.dart";
import "package:flutter/material.dart";

class CategoryProductsChart extends StatelessWidget {
  final List<Sales> sales;
  const CategoryProductsChart({super.key, required this.sales});

  // Rounds the raw padded max up to a "nice" step (1/2/5/10 x a power of ten)
  // so the axis divides evenly into 5 gridlines with no stray top label.
  double _niceInterval(int maxEarning) {
    if (maxEarning == 0) return 2;
    final rawStep = maxEarning * 1.2 / 5;
    final magnitude = pow(10, (log(rawStep) / ln10).floor()).toDouble();
    final residual = rawStep / magnitude;
    final niceResidual = residual <= 1
        ? 1
        : residual <= 2
        ? 2
        : residual <= 5
        ? 5
        : 10;
    return niceResidual * magnitude;
  }

  @override
  Widget build(BuildContext context) {
    final maxEarning = sales
        .map((sale) => sale.earning)
        .fold<int>(0, (prev, curr) => curr > prev ? curr : prev);
    final interval = _niceInterval(maxEarning);
    final maxY = interval * 5;

    return AspectRatio(
      aspectRatio: 1.2,
      child: BarChart(
        BarChartData(
          maxY: maxY,
          barTouchData: BarTouchData(
            touchTooltipData: BarTouchTooltipData(
              getTooltipItem: (group, groupIndex, rod, rodIndex) {
                return BarTooltipItem(
                  '${sales[group.x.toInt()].label}\n\$${rod.toY.toInt()}',
                  const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                );
              },
            ),
          ),
          titlesData: FlTitlesData(
            topTitles: const AxisTitles(
              sideTitles: SideTitles(showTitles: false),
            ),
            rightTitles: const AxisTitles(
              sideTitles: SideTitles(showTitles: false),
            ),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                reservedSize: 44,
                interval: interval,
              ),
            ),
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, meta) {
                  final index = value.toInt();
                  if (index < 0 || index >= sales.length) {
                    return const SizedBox.shrink();
                  }
                  return Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Text(
                      sales[index].label,
                      style: const TextStyle(fontSize: 10),
                    ),
                  );
                },
              ),
            ),
          ),
          borderData: FlBorderData(show: false),
          gridData: FlGridData(
            show: true,
            drawVerticalLine: false,
            horizontalInterval: interval,
          ),
          barGroups: List.generate(sales.length, (index) {
            return BarChartGroupData(
              x: index,
              barRods: [
                BarChartRodData(
                  toY: sales[index].earning.toDouble(),
                  color: Colors.blue,
                  width: 30,
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(4),
                  ),
                ),
              ],
            );
          }),
        ),
      ),
    );
  }
}
