<?php

require __DIR__ . '/../vendor/autoload.php';

header('Content-Type: text/plain');
header('X-Logger-Interface: ' . (interface_exists(Psr\Log\LoggerInterface::class) ? 'yes' : 'no'));

try {
    $pdo = new PDO(
        sprintf('mysql:host=%s;port=%s;dbname=%s', getenv('DB_HOST'), getenv('DB_PORT') ?: '3306', getenv('DB_DATABASE')),
        (string) getenv('DB_USERNAME'),
        (string) getenv('DB_PASSWORD'),
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_TIMEOUT => 3],
    );
    $pdo->query('SELECT 1');
} catch (Throwable $exception) {
    http_response_code(500);
    echo 'db-error: ' . $exception->getMessage();

    return;
}

echo 'e2e:php-mariadb:v2';
