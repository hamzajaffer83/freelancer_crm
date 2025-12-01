<?php

namespace Database\Seeders;

use App\Models\AppSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AppSetting::create([
            'key' => 'app_name',
            'value' => 'Degvora Freelancer CRM',
        ]);

        AppSetting::create([
            'key' => 'app_title',
            'value' => 'Degvora Freelancer CRM',
        ]);
    }
}
