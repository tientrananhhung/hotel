<?php

use Faker\Generator as Faker;
use App\Order;

$factory->define(App\Bill::class, function (Faker $faker) {
    $total = $faker->numberBetween($min = 500000, $max = 1000000);
    $discount = $faker->numberBetween($min = 50000, $max = 100000);
    $orders = Order::pluck('id');
    return [
        'to' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'discount' => $discount,
        'total' => $total,
        'order_id' => $faker->randomElement($orders),
    ];
});