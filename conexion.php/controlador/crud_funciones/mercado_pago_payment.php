<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");

// Configura tus credenciales de Mercado Pago
$accessToken = 'TEST-7850621271605520-081016-711263f40f701065b896974a2443a10d-653662904'; // Reemplaza con tu Access Token de Mercado Pago
$apiEndpoint = 'https://api.mercadopago.com/checkout/preferences'; // Endpoint para crear preferencias

// Recibe el monto desde la solicitud
$amount = isset($_POST['amount']) ? $_POST['amount'] : '0';

// Verifica y convierte el monto a número flotante
$amount = floatval($amount);

if ($amount <= 0) {
    echo json_encode(['error' => 'Monto inválido']);
    exit;
}

// Configura los parámetros de la solicitud
$requestParams = [
    'items' => [
        [
            'title' => 'Descripción del pago',
            'quantity' => 1,
            'unit_price' => $amount,
            'currency_id' => 'COP', // Asegúrate de que la moneda esté configurada correctamente
        ]
    ],
    'back_urls' => [
        'success' => 'http://localhost:5173/resultado_pago', // URL de éxito
        'failure' => 'http://localhost:5173/resultado_pago', // URL de fallo
        'pending' => 'http://localhost:5173/resultado_pago' // URL de pendiente
    ],
    'auto_return' => 'approved',
    'payment_methods' => [
        'excluded_payment_methods' => [
            ['id' => 'ticket']
        ],
        'excluded_payment_types' => [
            ['id' => 'ticket']
        ]
    ]
];

// Realiza la solicitud a Mercado Pago
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiEndpoint);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestParams));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $accessToken
]);
$response = curl_exec($ch);

// Verifica errores de cURL
if ($response === false) {
    echo json_encode(['error' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Procesa la respuesta
$responseArray = json_decode($response, true);
if (json_last_error() === JSON_ERROR_NONE && isset($responseArray['init_point'])) {
    echo json_encode(['url' => $responseArray['init_point']]);
} else {
    $errorMessage = isset($responseArray['message']) ? $responseArray['message'] : 'Error desconocido';
    echo json_encode(['error' => $errorMessage, 'response' => $response]);
}
?>
