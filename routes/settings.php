<?php

use App\Http\Controllers\Settings\AppSettingController;
use App\Http\Controllers\Settings\CustomerController;
use App\Http\Controllers\Settings\CustomerSettingController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('user-password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');

    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/app', [AppSettingController::class, 'index'])->name('app');
        Route::post('/app-setting-form-store', [AppSettingController::class, 'store'])->name('appSettingForm');
        Route::get('/customer', [CustomerSettingController::class, 'index'])->name('customer');
        Route::post('/store-customer-label', [CustomerSettingController::class, 'storeLabel'])->name('storeLabel');

        Route::delete('/delete-customer-label/{id}', [CustomerSettingController::class, 'destroyLabel'])
            ->name('destroyCustomerLabel');


        // Get JSON Data
        Route::get('/get-customer-label-data', [CustomerSettingController::class, 'getCustomerLabelData'])->name('getCustomerLabelData');
    });
});
