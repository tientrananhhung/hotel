<?php

use Faker\Generator as Faker;
use App\User;
use App\Room;
use App\Customer;
use App\Service;

$factory->define(App\Order::class, function (Faker $faker) {
    $date = $faker->date($format = 'Y-m-d', $max = 'now');
    $users = User::pluck('id');
    $rooms = Room::pluck('id');
    $customers = Customer::pluck('id');
    $services = Service::whereIn('id',[1,2,3])->get();
    $room_id =  $faker->randomElement($rooms);
    $room = Room::find($room_id);
    $data = [
        'services' => $services,
        'room' => $room
    ];
    // $data = [
    //     "service"=> '[{"id": "1","name": "Clarabelle Stiedemann","price": "265997","description": "Hic quos id ut fuga commodi odit sunt."},{"id": "2","name": "Annalise Corkery","price": "185756","description": "Commodi ea impedit assumenda corrupti."},{"id": "3","name": "Coy Considine","price": "187178","description": "Fugiat sit tempore libero voluptas aut."}], "order": {"id": "1","user_id": {"id": "1","name": "Administrator","birthday": "1970-06-05","address": "36 Nguyễn Phước Thái","phone": "0966575492","avatar": "avatar.png","email": "admin@gmail.com","isadmin": "1"},"room_id": {"id": "1","name": "Laney Yost","type": "Phòng Đôi","price": "260540","note": "Incidunt molestiae ea fugiat dolor doloribus eveniet adipisci mollitia voluptate omnis sequi error rerum hic omnis nostrum et."},"customer_id": {"id": "1","name": "Amya Cassin","birthday": "1982-02-11","address": "845 Zemlak Harbor Suite 036","phone": "+5419716835049","avatar": "avatar.png","identity_card": "7065250778","count": "5","note": "Dolor quia natus minus velit saepe recusandae voluptatum quaerat optio aut eaque commodi et sequi.","email": "jovan91@example.org"}}}
    // ],
    return [
        'created_at' => $date,
        'from' => $date,
        'to' => $date,
        'data' => json_encode($data),
        'from_rent' => $date,
        'customer_id' => $faker->randomElement($customers),
        'user_id' => $faker->randomElement($users),
        'room_id' => $room_id,
    ];
});