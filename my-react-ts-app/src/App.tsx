import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

interface Service {
  id: number;
  name: string;
  price: number;
}

interface ServiceItem {
  service: Service;
  quantity: number;
}

const availableServices: Service[] = [
  { id: 1, name: "Разработка лендинга", price: 50000 },
  { id: 2, name: "Интернет-магазин", price: 150000 },
  { id: 3, name: "Корпоративный портал", price: 300000 },
  { id: 4, name: "SEO-оптимизация", price: 20000 },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProjectBuilder />
    </>
  );
}

export function ProjectBuilder() {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  let totalPrice = 0;
  for (const item of selectedServices) {
    totalPrice += item.service.price * item.quantity;
  }

  function addService() {
    if (quantity < 1 || quantity > 10) {
      setError("Количество должно быть от 1 до 10");
      return;
    }
    setError(null);
    const service = availableServices.find((s) => s.id === selectedServiceId);
    if (!service) return;

    const existing = selectedServices.find(
      (item) => item.service.id === service.id,
    );
    if (existing) {
      setSelectedServices((prev) =>
        prev.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
      setSelectedServiceId("");
      setQuantity(1);
    } else {
      setSelectedServices((prev) => [...prev, { service, quantity }]);
      setSelectedServiceId("");
      setQuantity(1);
    }
  }

  function removeService(item: ServiceItem) {
    const index = selectedServices.indexOf(item);
    if (index > -1) {
      setSelectedServices((prev) => prev.filter((_, i) => i !== index));
    }
  }

  return (
    <>
      <div
        className="project-builder"
        style={{ maxWidth: 700, margin: "0 auto", fontFamily: "sans-serif" }}
      >
        <h2>Состав проекта</h2>
        {error && (
          <p style={{ color: "red", fontSize: 12, marginLeft: 8 }}>{error}</p>
        )}
        <div
          className="add-service"
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <select
            value={selectedServiceId}
            onChange={(e) => {
              setSelectedServiceId(Number(e.target.value));
            }}
          >
            <option value="" disabled>
              Выберите услугу
            </option>
            {availableServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} — {service.price.toLocaleString()} ₽
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
            style={{ width: 80, padding: "8px 12px" }}
          />
          <button onClick={addService} disabled={!selectedServiceId} />
          Добавить
          <button onClick={addService} disabled={!selectedServiceId}>
            Добавить
          </button>
        </div>

        {selectedServices.length > 0 ? (
          <table
            className="services-table"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: 10,
                    textAlign: "left",
                  }}
                >
                  Услуга
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: 10,
                    textAlign: "left",
                  }}
                >
                  Цена за ед.
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: 10,
                    textAlign: "left",
                  }}
                >
                  Кол-во
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: 10,
                    textAlign: "left",
                  }}
                >
                  Сумма
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: 10,
                    textAlign: "left",
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {selectedServices.map((item) => (
                <tr key={item.service.id}>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>
                    {item.service.name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>
                    {item.service.price.toLocaleString()} ₽
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>
                    {item.quantity}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>
                    {(item.service.price * item.quantity).toLocaleString()} ₽
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>
                    <button onClick={() => removeService(item)}>Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={3}
                  style={{ border: "1px solid #ddd", padding: 10 }}
                >
                  <strong>Итого:</strong>
                </td>
                <td
                  colSpan={2}
                  style={{ border: "1px solid #ddd", padding: 10 }}
                >
                  <strong>{totalPrice.toLocaleString()} ₽</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p style={{ color: "#888", fontStyle: "italic" }}>
            Пока не добавлено ни одной услуги
          </p>
        )}
      </div>
    </>
  );
}

export default App;
