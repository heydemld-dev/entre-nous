<?php
/* =====================================================================
   get_chat_id.php — узнать свой chat_id
   Как пользоваться:
     1. Впишите токен ниже.
     2. Залейте файл на сайт.
     3. Откройте в браузере: https://entre-nous.ru/get_chat_id.php
     4. ВАЖНО: сначала напишите вашему боту в Telegram любое сообщение
        (найдите его по username), иначе список будет пустым.
     5. Скопируйте chat_id и УДАЛИТЕ этот файл с сайта.
   ===================================================================== */

$BOT_TOKEN = '8310798967:AAFYTXhrSuAQDx0ruDAR982mqJ952LkFfg0';

header('Content-Type: text/html; charset=utf-8');
echo '<pre style="font:14px monospace;padding:20px">';

$raw = @file_get_contents("https://api.telegram.org/bot{$BOT_TOKEN}/getUpdates");
if ($raw === false) {
    exit("Не удалось обратиться к Telegram. Проверьте интернет на сервере.\n</pre>");
}

$data = json_decode((string)$raw, true);

if (!($data['ok'] ?? false)) {
    echo "Ошибка. Скорее всего неверный токен.\n\n";
    print_r($data);
    exit("</pre>");
}

$found = [];
foreach (($data['result'] ?? []) as $upd) {
    $chat = $upd['message']['chat'] ?? $upd['channel_post']['chat'] ?? null;
    if (!$chat) { continue; }
    $who = trim(($chat['first_name'] ?? '') . ' ' . ($chat['last_name'] ?? '') . ' ' . ($chat['username'] ?? ''));
    $found[$chat['id']] = $who !== '' ? $who : 'без имени';
}

if (!$found) {
    echo "Список пуст.\n\n";
    echo "Откройте Telegram → найдите вашего бота по username →\n";
    echo "нажмите START и отправьте ему любое сообщение.\n";
    echo "Затем обновите эту страницу.\n";
} else {
    echo "Найденные chat_id:\n\n";
    foreach ($found as $id => $who) {
        echo "chat_id: $id   ($who)\n";
    }
    echo "\nСкопируйте число из строки выше и вставьте в callback.php.\n";
    echo "\n!!! После этого удалите get_chat_id.php с сайта !!!\n";
}

echo '</pre>';
