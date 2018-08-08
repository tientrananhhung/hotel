<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Administrator',
            'birthday' => '1995-03-23',
            'address' => '36 Nguyễn Phước Thái',
            'phone' => '0966575492',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'isadmin' => '1'
        ]);
        $this->call(UsersTableSeeder::class);
        $this->call(RoomsTableSeeder::class);
        $this->call(ServiceSeeder::class);
        $this->call(CustomersTableSeeder::class);
        $this->call(OrdersTableSeeder::class);
        $this->call(BillsTableSeeder::class);
    }
}
