<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class HomeController
{
    /**
     * The visits table comes from the schema dump, its source column from the
     * migration after it: both only exist when migrate loaded the dump first.
     */
    public function __invoke(): Response
    {
        $checks = [
            'db' => $this->check(function (): string {
                DB::table('visits')->insert(['source' => 'e2e', 'created_at' => now()]);

                return 'visits=' . DB::table('visits')->where('source', 'e2e')->count();
            }),
            'cache' => $this->check(function (): string {
                Cache::store('redis')->put('e2e', 'pong', 30);
                if (Cache::store('redis')->get('e2e') !== 'pong') {
                    throw new \RuntimeException('value not read back');
                }

                return '';
            }),
        ];

        // Any failed check fails the deployment's healthcheck instead of passing quietly.
        $failed = array_filter($checks, fn (string $result): bool => !str_starts_with($result, 'ok'));

        return response()->view('home', $checks, $failed === [] ? 200 : 500);
    }

    /**
     * @param callable(): string $check
     */
    private function check(callable $check): string
    {
        try {
            return trim('ok ' . $check());
        } catch (\Throwable $exception) {
            report($exception);

            return 'fail (' . class_basename($exception) . ': ' . $exception->getMessage() . ')';
        }
    }
}
