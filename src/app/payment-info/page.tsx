// src/app/payment-info/page.tsx

export default function PaymentInfoPage() {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Реквизиты для оплаты</h1>
      <p className="mb-4">
        Вы можете оплатить тур по следующим банковским реквизитам:
      </p>
      <div className="bg-gray-50 p-4 rounded-2xl border">
        <p>
          <strong>Получатель: </strong>ООО {'"'}тут-ТУР{'"'}
        </p>
        <p>
          <strong>ИНН: </strong>8501740510
        </p>
        <p>
          <strong>Р/с: </strong>123428101291650012
        </p>
        <p>
          <strong>Банк: </strong>ПАО {'"'}Промсвязьбанк{'"'}
        </p>
        <p>
          <strong>БИК: </strong>ПАО {'"'}086427462{'"'}
        </p>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        После оплаты сообщите менеджеру номер заявки и дату перевода.
      </p>
    </div>
  );
}
