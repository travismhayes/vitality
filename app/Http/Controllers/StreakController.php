<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StreakController extends Controller
{
    public function __invoke()
    {
        return response()->json([
            "2023-01-24" => 82,
            "2023-01-26" => 4,
            "2023-01-25" => 239,
            "2022-11-24" => 82,
            "2022-02-26" => 4,
            "2022-02-25" => 239
        ]);
    }
}
