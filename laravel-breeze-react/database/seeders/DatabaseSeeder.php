<?php

namespace Database\Seeders;

use App\Models\Location;
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
        // Категории
        $MotorVehicles = Category::create(['name' => 'Моторни Возила']);
        $RealEstate = Category::create(['name' => 'Недвижности']);
        $HomeAndGarden = Category::create(['name' => 'Дом и Градина']);
        $FashionAndClothing = Category::create(['name' => 'Мода и Облека']);
        $MobilePhonesAndAccessories = Category::create(['name' => 'Мобилни Телефони и Додатоци']);

        $Computers = Category::create(['name' => 'Компјутери']);
        $TVVideoPhotoAndMultimedia = Category::create(['name' => 'ТВ, Видео, Фотографија и Мултимедија']);
        $MusicalInstrumentsAndEquipment = Category::create(['name' => 'Музички Инструменти и Опрема']);
        $WatchesAndJewelry = Category::create(['name' => 'Часовници и Накит']);
        $BabyAndChildrenProducts = Category::create(['name' => 'Бебешки и Детски Производи']);

        $HealthBeautySupplementsAndEquipment = Category::create(['name' => 'Здравје, Убавина Додатоци и Опрема']);
        $CDsDVDsVHSMusicMovies = Category::create(['name' => 'ЦД-а, ДВД-а, ВХС, Музика, Филмови']);
        $BooksAndLiterature = Category::create(['name' => 'Книги и Литература']);
        $other = Category::create(['name' => 'Останато']);

        // Создади подкатегории
        // Подкатегории за Моторни Возила
        $cars = $MotorVehicles->children()->create(['name' => 'Автомобили']);
        $trucks = $MotorVehicles->children()->create(['name' => 'Камиони']);
        $bikes = $MotorVehicles->children()->create(['name' => 'Мотори']);

        // Подкатегории за Недвижности
        $houses = $RealEstate->children()->create(['name' => 'Куќи']);
        $apartments = $RealEstate->children()->create(['name' => 'Станови']);
        $lands = $RealEstate->children()->create(['name' => 'Земјишта']);

        // Подкатегории за Дом и Градина
        $furniture = $HomeAndGarden->children()->create(['name' => 'Мебел']);
        $gardenTools = $HomeAndGarden->children()->create(['name' => 'Градинарски Алати']);
        $decorations = $HomeAndGarden->children()->create(['name' => 'Декорации']);

        // Подкатегории за Мода и Облека
        $menClothing = $FashionAndClothing->children()->create(['name' => 'Машка Облека']);
        $womenClothing = $FashionAndClothing->children()->create(['name' => 'Женска Облека']);
        $childrenClothing = $FashionAndClothing->children()->create(['name' => 'Детска Облека']);

        // Подкатегории за Мобилни Телефони и Додатоци
        $smartphones = $MobilePhonesAndAccessories->children()->create(['name' => 'Паметни Телефони']);
        $tablets = $MobilePhonesAndAccessories->children()->create(['name' => 'Таблети']);
        $accessories = $MobilePhonesAndAccessories->children()->create(['name' => 'Додатоци']);


        $Skopje = Location::create(['name' => 'Скопје']);

        $Aerodrom = $Skopje->children()->create(['name' => 'Аеродром']);
        $Butel = $Skopje->children()->create(['name' => 'Бутел']);
        $Centar = $Skopje->children()->create(['name' => 'Центар']);
        $GaziBaba = $Skopje->children()->create(['name' => 'Гази Баба']);
        $GjorcePetrov = $Skopje->children()->create(['name' => 'Ѓорче Петров']);
        $KiselaVoda = $Skopje->children()->create(['name' => 'Кисела Вода']);
        $Saraj = $Skopje->children()->create(['name' => 'Сарај']);
        $SutoOrizari = $Skopje->children()->create(['name' => 'Шуто Оризари']);
        $Cair = $Skopje->children()->create(['name' => 'Чаир']);
        $Karpos = $Skopje->children()->create(['name' => 'Карпош']);

        $Aracinovo = Location::create(['name' => 'Арачиново']);
        $Berovo = Location::create(['name' => 'Берово']);
        $Bitola = Location::create(['name' => 'Битола']);
        $Bogdanci = Location::create(['name' => 'Богданци']);
        $Kumanovo = Location::create(['name' => 'Куманово']);
        $Tetovo = Location::create(['name' => 'Тетово']);
        $Prilep = Location::create(['name' => 'Прилеп']);
        $Gostivar = Location::create(['name' => 'Гостивар']);
        $Ohrid = Location::create(['name' => 'Охрид']);
        $Struga = Location::create(['name' => 'Струга']);
        $Strumica = Location::create(['name' => 'Струмица']);
        $Veles = Location::create(['name' => 'Велес']);
        $Stip = Location::create(['name' => 'Штип']);
        $Kicevo = Location::create(['name' => 'Кичево']);
        $Kavadarci = Location::create(['name' => 'Кавадарци']);
        $Kocani = Location::create(['name' => 'Кочани']);
        $Radovis = Location::create(['name' => 'Радовиш']);
        $Vinica = Location::create(['name' => 'Виница']);
        $Vrapciste = Location::create(['name' => 'Врапчиште']);
        $Gevgelija = Location::create(['name' => 'Гевгелија']);
        $DemirKapija = Location::create(['name' => 'Демир Капија']);
        $DemirHisar = Location::create(['name' => 'Демир Хисар']);
        $Dojran = Location::create(['name' => 'Дојран']);
        $Zelenikovo = Location::create(['name' => 'Зелениково']);
        $Zrnovci = Location::create(['name' => 'Зрновци']);
        // $Ilinden = Location::create(['name' => 'Илинден']);
        // $Jegunovce = Location::create(['name' => 'Јегуновце']);
        // $Kavadarci = Location::create(['name' => 'Кавадарци']);
        // $Karbinci = Location::create(['name' => 'Карбинци']);
        // $Krivogastani = Location::create(['name' => 'Кривогаштани']);
        // $Krusevo = Location::create(['name' => 'Крушево']);
        // $Kicevo = Location::create(['name' => 'Кичево']);
        // $Konche = Location::create(['name' => 'Конче']);
        // $Lipkovo = Location::create(['name' => 'Липково']);
        // $Lozovo = Location::create(['name' => 'Лозово']);
        // $MakedonskiBrod = Location::create(['name' => 'Македонски Брод']);
        // $MakedonskaKamenica = Location::create(['name' => 'Македонска Каменица']);
        // $Mogila = Location::create(['name' => 'Могила']);
        // $Negotino = Location::create(['name' => 'Неготино']);
        // $Novaci = Location::create(['name' => 'Новаци']);
        // $NovoSelo = Location::create(['name' => 'Ново Село']);
        // $Oslomej = Location::create(['name' => 'Осломеј']);
        // $Pehcevo = Location::create(['name' => 'Пехчево']);
        // $Plasnica = Location::create(['name' => 'Пласница']);
        // $Prilep = Location::create(['name' => 'Прилеп']);
        // $Probistip = Location::create(['name' => 'Пробиштип']);
        // $Radovis = Location::create(['name' => 'Радовиш']);
        // $Rankovce = Location::create(['name' => 'Ранковце']);
        // $Rosoman = Location::create(['name' => 'Росоман']);
        // $Sopiste = Location::create(['name' => 'Сопиште']);
        // $StaroNagoricane = Location::create(['name' => 'Старо Нагоричане']);
        // $Stip = Location::create(['name' => 'Штип']);
        // $Struga = Location::create(['name' => 'Струга']);
        // $Strumica = Location::create(['name' => 'Струмица']);
        // $Studenicani = Location::create(['name' => 'Студеничани']);
        // $Tearce = Location::create(['name' => 'Теарце']);
        // $Tetovo = Location::create(['name' => 'Тетово']);
        // $CentarZupa = Location::create(['name' => 'Центар Жупа']);
        // $CesinovoOblesevo = Location::create(['name' => 'Чешиново-Облешево']);
        // $StaJeRada = Location::create(['name' => 'Штаје Рада']);


        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => bcrypt('nikola123'),
            'role' => 'admin',
            'location' => fake()->numberBetween(1, 10),
            'phoneNumber' => '078888666',
        ]);
        User::factory()->create([
            'name' => 'Normal User',
            'email' => 'user@user.com',
            'password' => bcrypt('nikola123'),
            'role' => 'user',
            'location' => fake()->numberBetween(1, 10),
            'phoneNumber' => '078585666',
        ]);

        Ad::factory()->count(50)->create();
    }
}
