<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\AdFactory;
use Illuminate\Database\Seeder;
use App\Models\Ad;
use App\Models\Review;
use App\Models\Category;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Categories
        $electronics = Category::create(['name' => 'Electronics']);
        $homeAppliances = Category::create(['name' => 'Home Appliances']);

        // Create subcategories
        $laptops = $electronics->children()->create(['name' => 'Laptops']);

        $lenovo = $laptops->children()->create(['name' => 'Lenovo']);

        $tablets = $electronics->children()->create(['name' => 'Tablets']);
        $smartphones = $electronics->children()->create(['name' => 'Smartphones']);

        $refrigerators = $homeAppliances->children()->create(['name' => 'Refrigerators']);
        $washingMachines = $homeAppliances->children()->create(['name' => 'Washing Machines']);


        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => bcrypt('nikola123'),
            'role' => 'admin',
            'location' => 'Skopje',
            'phoneNumber' => '078888666',
        ]);
        User::factory()->create([
            'name' => 'Normal User',
            'email' => 'user@user.com',
            'password' => bcrypt('nikola123'),
            'role' => 'user',
            'location' => 'Skopje',
            'phoneNumber' => '078585666',
        ]);

        Ad::factory()->count(10)->create();
    }
}
