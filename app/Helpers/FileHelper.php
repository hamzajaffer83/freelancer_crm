<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileHelper
{
    /**
     * Store uploaded file with unique name and return only filename.
     *
     * @param UploadedFile|null $file
     * @param string $folder
     * @return string|null
     */
    public static function store(UploadedFile $file = null, string $folder = 'uploads')
    {
        if (!$file) {
            return null;
        }

        // Generate unique name
        $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();

        // Store in storage/app/public/<folder>/
        $file->storeAs('/' . $folder, $filename);

        return $folder . '/' . $filename; // Return only file name
    }

    /**
     * Delete a file from storage/app/public safely.
     *
     * @param string|null $path
     * @return bool
     */
    public static function delete(?string $path): bool
    {
        if (!$path) {
            return false;
        }

        // Check if file exists
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }

        return false;
    }
}