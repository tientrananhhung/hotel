<?php

use Faker\Generator as Faker;

$factory->define(App\Service::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'price' => $faker->numberBetween($min = 100000, $max = 300000),
        'description' => $faker->sentence($nbWords = 6, $variableNbWords = true),
    ];
});
