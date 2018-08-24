<?php

use Faker\Generator as Faker;

$factory->define(App\Customer::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'birthday' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'address' => $faker->streetAddress,
        'phone' => $faker->unique()->e164PhoneNumber,
        'identity_card' => $faker->unique()->regexify('[0-9]{9,10}'),
        // 'count' => $faker->numberBetween($min = 1, $max = 5),
        'note' => $faker->sentence($nbWords = 15, $variableNbWords = true),
        'email' => $faker->unique()->safeEmail,
    ];
});
