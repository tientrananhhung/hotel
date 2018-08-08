<?php

use Faker\Generator as Faker;

$factory->define(App\Room::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'type' => $faker->randomElement(['Phòng Đơn' ,'Phòng Đôi', 'Phòng Gia Đình', 'Phòng VIP']),
        'status' => $faker->randomElement([0 , 1]),
        'price' => $faker->numberBetween($min = 100000, $max = 300000),
        'note' => $faker->sentence($nbWords = 15, $variableNbWords = true),
    ];
});
